import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import './styles/Resultados.css';

const API_URL = process.env.REACT_APP_API_URL;

const Resultados = () => {
    const [reporte, setReporte] = useState(null);
    const [ordenes, setOrdenes] = useState([]);
    const [loading, setLoading] = useState(false);
    const { id_reporte } = useParams();
    const navigate = useNavigate();

    // Función para consumir la API y obtener el reporte y las órdenes asociadas
    const apiReporte = async () => {
        try {
            const reporteResponse = await fetch(`${API_URL}/reportes/${id_reporte}`);
            if (!reporteResponse.ok) {
                throw new Error("Error al obtener el reporte");
            }
            const reporteData = await reporteResponse.json();
            setReporte(reporteData);

            const ordenesResponse = await fetch(`${API_URL}/ordenes/reporte/${id_reporte}`);
            if (!ordenesResponse.ok) {
                throw new Error("Error al obtener las órdenes");
            }
            const ordenesData = await ordenesResponse.json();
            setOrdenes(ordenesData);
        } catch (error) {
            console.error("Error al cargar los datos:", error);
        }
    };

    // Función para exportar el informe a Excel
    const exportarExcel = async () => {
        if (!id_reporte) {
            alert("No se pudo identificar el reporte.");
            return;
        }

        setLoading(true);
        try {
            const response = await fetch(`${API_URL}/reportes/exportar/${id_reporte}`, { method: 'GET' });

            if (!response.ok) {
                const errorDetails = await response.json();
                throw new Error(errorDetails.message || "Error desconocido al exportar");
            }

            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `Reporte_${reporte?.nombreMes || "informe"}.xlsx`;
            document.body.appendChild(a);
            a.click();
            a.remove();
            window.URL.revokeObjectURL(url);
        } catch (error) {
            console.error("Error al exportar a Excel:", error);
            alert(`Error al exportar el informe: ${error.message}`);
        } finally {
            setLoading(false);
        }
    };

    const regresar = () => {
        navigate(`/reporte/${id_reporte}`);
    };

    useEffect(() => {
        apiReporte();
    }, [id_reporte]);

    return (
        <div className="main-resultados">
            <div className="head-resultados">
                <h1> REPORTE MES: </h1>
                <h1 id="nombreMes">{reporte ? reporte.nombreMes : "Cargando..."}</h1>
            </div>
            <div className="formato-resultados">
                <div className="body-resultados">
                    <div className="info-resultados">
                        <h3>Total neto:</h3>
                        <h3 id="totalNeto">{reporte ? reporte.totalNeto.toFixed(2) : "Cargando..."}</h3>
                        <h3>Total gastos:</h3>
                        <h3 id="totalGastos">{reporte ? reporte.totalGastos.toFixed(2) : "Cargando..."}</h3>
                        <h3>Ganancia Total:</h3>
                        <h3 id="ganancia">{reporte ? reporte.ganancia.toFixed(2) : "Cargando..."}</h3>
                    </div>
                    <button 
                        className="boton-exportacion-excel" 
                        onClick={exportarExcel}
                        disabled={loading}
                    >
                        {loading ? "Exportando..." : "Exportar informe a Excel"}
                    </button>
                </div>
                <div className="ordenes-resultados">
                    <h3>Órdenes Asociadas:</h3>
                    <div className="tabla-resultados-ordenes-container">
                        <table className="tabla-resultados-ordenes">
                            <thead>
                                <tr>
                                    <th>ID Orden</th>
                                    <th>Número de Orden</th>
                                    <th>Valor</th>
                                    <th>Fecha</th>
                                </tr>
                            </thead>
                            <tbody>
                                {ordenes.length > 0 ? (
                                    ordenes.map((orden) => (
                                        <tr key={orden.id_orden}>
                                            <td>{orden.id_orden}</td>
                                            <td>{orden.numeroOrden}</td>
                                            <td>{orden.valor.toFixed(2)}</td>
                                            <td>{orden.fecha}</td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="4">No hay órdenes asociadas</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <button className="boton-regresar" onClick={regresar}>Regresar</button>
        </div>
    );
};

export default Resultados;
