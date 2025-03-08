import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import './styles/Bienvenida.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHistory } from '@fortawesome/free-solid-svg-icons';

const API_URL = process.env.REACT_APP_API_URL;

const Bienvenida = () => {
    const [reportes, setReportes] = useState([]); 
    const [reporteSeleccionado, setReporteSeleccionado] = useState(''); 
    const [nombreMes, setNombreMes] = useState(''); 
    const navigate = useNavigate(); 

    const apiReporte = async () => {
        try {
            const response = await fetch(`${API_URL}/reportes/`);
            if (!response.ok) {
                throw new Error("Error al obtener los reportes");
            }
            const data = await response.json();
            setReportes(data);
        } catch (error) {
            console.error("Error al obtener los reportes:", error);
        }
    };

    useEffect(() => {
        apiReporte();
    }, []);

    const handleReporteChange = (event) => {
        setReporteSeleccionado(event.target.value);
    };

    const irReporte = () => {
        if (reporteSeleccionado) {
            navigate(`/reporte/${reporteSeleccionado}`);
        } else {
            alert("Por favor, seleccione un reporte.");
        }
    };

    const crearReporte = async () => {
        if (!nombreMes.trim()) {
            alert("Ingrese un nombre válido para el mes.");
            return;
        }

        try {
            const response = await fetch(`${API_URL}/reportes/`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ nombreMes }),
            });

            if (response.ok) {
                const nuevoReporte = await response.json();
                alert(`Reporte creado con éxito: ${nuevoReporte.nombreMes}`);
                setReportes([...reportes, nuevoReporte]); 
                setNombreMes('');
            } else {
                alert("Error al crear el reporte.");
            }
        } catch (error) {
            console.error("Error al crear el reporte:", error);
        }
    };

    const recargarReportes = async () => {
        try {
            const response = await fetch(`${API_URL}/reportes/`);
            if (!response.ok) {
                throw new Error("Error al recargar los reportes");
            }
            const data = await response.json();
            setReportes(data);
            alert("Reportes recargados correctamente");
        } catch (error) {
            console.error("Error al recargar los reportes:", error);
        }
    };

    return (
        <div className="mainPage">
            <div className="head-Main">
                <h1>Bienvenidos</h1>
                <h2>Reporte Mensual Fast Cleaning Laundry</h2>
            </div>
            <div className="body-Main">
                <div className="seleccionar-reporte">
                    <div className="select-boton-reporte">
                        <select
                            className="combobox-reporte"
                            value={reporteSeleccionado}
                            onChange={handleReporteChange}
                        >
                            <option value="" disabled>Seleccione un reporte</option>
                            {reportes.map((reporte) => (
                                <option key={reporte.id_reporteMensual} value={reporte.id_reporteMensual}>
                                    {reporte.nombreMes}
                                </option>
                            ))}
                        </select>
                        <button className="recargar-boton-reporte" onClick={recargarReportes}>
                            <FontAwesomeIcon icon={faHistory} />
                        </button>
                    </div>
                    <h3>Seleccionar reporte:</h3>
                    <button className="boton-crear" onClick={irReporte}>Ir al reporte</button>
                    <p>Seleccione el nombre del mes a reportar 
                    <br /> y dé clic en "Ir al reporte".</p>
                </div>
                <div className="crear-reporte">
                    <h3>Ingrese el nombre del mes:</h3>
                    <input
                        placeholder="Enero-2024"
                        value={nombreMes}
                        onChange={(e) => setNombreMes(e.target.value)}
                    />
                    <button className="boton-crear" onClick={crearReporte}>Crear reporte</button>
                    <p>Ingrese el nombre del mes seguido del año para crearlo 
                    <br /> y dé clic en crear reporte.</p>
                </div>
            </div>
        </div>
    );
};

export default Bienvenida;
