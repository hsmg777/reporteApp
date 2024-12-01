import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Reemplazar useHistory por useNavigate
import './styles/Bienvenida.css';

const Bienvenida = () => {
    const [reportes, setReportes] = useState([]); 
    const [reporteSeleccionado, setReporteSeleccionado] = useState(''); // Estado para el combobox
    const [nombreMes, setNombreMes] = useState(''); // Estado para crear reporte
    const navigate = useNavigate(); 

    // obtener los reportes desde la API
    const apiReporte = async () => {
        try {
            const response = await fetch('https://fastcleaningapp-latest.onrender.com/tasks/reportes/');
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
            const response = await fetch('https://fastcleaningapp-latest.onrender.com/tasks/reportes/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ nombreMes }),
            });

            if (response.ok) {
                const nuevoReporte = await response.json();
                alert(`Reporte creado con éxito: ${nuevoReporte.nombreMes}`);
                setReportes([...reportes, nuevoReporte]); // Agregar el nuevo reporte a la lista
                setNombreMes(''); // Limpiar el campo de entrada
            } else {
                alert("Error al crear el reporte.");
            }
        } catch (error) {
            console.error("Error al crear el reporte:", error);
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
                    <h3>Seleccionar reporte:</h3>
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
