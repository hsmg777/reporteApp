import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import './styles/Resultados.css';

const Resultados = () => {
    const [reporte, setReporte] = useState(null); // Estado para los datos del reporte
    const [loading, setLoading] = useState(false); // Estado para el botón de carga
    const { id_reporte } = useParams(); // Obtiene el ID del reporte desde la URL

    // Función para consumir la API y obtener los datos del reporte
    const apiReporte = async () => {
        try {
            const response = await fetch(`http://127.0.0.1:5000/tasks/reportes/${id_reporte}`);
            if (!response.ok) {
                throw new Error("Error al obtener el reporte");
            }
            const data = await response.json();
            setReporte(data); // Actualiza el estado con los datos del reporte
        } catch (error) {
            console.error("Error al cargar el reporte:", error);
        }
    };

    // Función para exportar el informe a Excel
    const exportarExcel = async () => {
        if (!id_reporte) {
            alert("No se pudo identificar el reporte.");
            return;
        }

        setLoading(true); // Activa el estado de carga
        try {
            const response = await fetch(`http://127.0.0.1:5000/tasks/reportes/exportar/${id_reporte}`, {
                method: 'GET',
            });
        
            if (!response.ok) {
                const errorDetails = await response.json(); // Intenta obtener el mensaje de error
                throw new Error(errorDetails.message || "Error desconocido al exportar");
            }
        
            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `Reporte_${reporte?.nombreMes || "informe"}.xlsx`; // Nombre del archivo
            document.body.appendChild(a);
            a.click();
            a.remove();
            window.URL.revokeObjectURL(url);
        } catch (error) {
            console.error("Error al exportar a Excel:", error);
            alert(`Error al exportar el informe: ${error.message}`);
        }
        
    };

    // Llama a la API al cargar el componente
    useEffect(() => {
        apiReporte();
    }, [id_reporte]);

    return (
        <div className="main-resultados">
            <div className="head-resultados">
                <h1> REPORTE MES: </h1> 
                <h1 id="nombreMes">{reporte ? reporte.nombreMes : "Cargando..."}</h1>
            </div>
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
                    disabled={loading} // Desactiva el botón mientras se está exportando
                >
                    {loading ? "Exportando..." : "Exportar informe a Excel"}
                </button>
            </div>
        </div>
    );
};

export default Resultados;
