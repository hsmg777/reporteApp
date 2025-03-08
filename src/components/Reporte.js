import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import './styles/Reporte.css';

const API_URL = process.env.REACT_APP_API_URL;

const Reporte = () => {
    const { id_reporte } = useParams();
    const [nombreMes, setNombreMes] = useState(""); 
    const navigate = useNavigate();

    // Obtener los detalles del reporte
    const fetchReporte = async () => {
        try {
            const response = await fetch(`${API_URL}/reportes/${id_reporte}`);
            if (!response.ok) {
                throw new Error("Error al obtener el reporte");
            }
            const data = await response.json();
            setNombreMes(data.nombreMes); 
        } catch (error) {
            console.error("Error al cargar el reporte:", error);
        }
    };

    const addOrder = async () => {
        const numeroOrden = document.getElementById("numeroOrden").value;
        const valorOrden = document.getElementById("valorOrden").value;
    
        if (!numeroOrden || !valorOrden) {
            alert("Por favor, complete todos los campos de la orden.");
            return;
        }
    
        const payload = {
            id_reporteMensual: parseInt(id_reporte, 10),
            numeroOrden: parseInt(numeroOrden, 10),
            valor: parseFloat(valorOrden)
        };
    
        console.log("Enviando JSON:", JSON.stringify(payload)); // Debug
    
        try {
            const response = await fetch(`${API_URL}/ordenes`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });
    
            const result = await response.json();
            if (!response.ok) {
                throw new Error(result.message || "Error desconocido al crear la orden");
            }
    
            alert("Orden añadida correctamente.");
            document.getElementById("numeroOrden").value = "";
            document.getElementById("valorOrden").value = "";
    
        } catch (error) {
            console.error("Error al añadir la orden:", error);
            alert(`Error: ${error.message}`);
        }
    };
    

    const addFactura = async () => {
        const numeroFactura = document.getElementById("numeroFactura").value;
        const valorFactura = document.getElementById("valorFactura").value;
    
        if (!numeroFactura || !valorFactura) {
            alert("Por favor, complete todos los campos de la factura.");
            return;
        }
    
        const payload = {
            id_reporteMensual: parseInt(id_reporte, 10),
            numeroFactura: parseInt(numeroFactura, 10),
            valor: parseFloat(valorFactura)
        };
    
        console.log("📌 Enviando JSON:", JSON.stringify(payload)); // Depuración
    
        try {
            const response = await fetch(`${API_URL}/facturas`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });
    
            const result = await response.json();
            if (!response.ok) {
                throw new Error(result.message || "Error desconocido al crear la factura");
            }
    
            alert("Factura añadida correctamente.");
            document.getElementById("numeroFactura").value = "";
            document.getElementById("valorFactura").value = "";
    
        } catch (error) {
            console.error("🚨 Error al añadir la factura:", error);
            alert(`Error: ${error.message}`);
        }
    };
    

    const addSpent = async () => {
        const nombreGasto = document.getElementById("nombreGasto").value.trim();
        const valorGasto = document.getElementById("valorGasto").value;
    
        if (!nombreGasto || !valorGasto || isNaN(parseFloat(valorGasto))) {
            alert("Por favor, ingrese un nombre de gasto válido y un valor numérico.");
            return;
        }
    
        const payload = {
            id_reporteMensual: parseInt(id_reporte, 10),
            nombreGasto: nombreGasto,
            valor: parseFloat(valorGasto)
        };
    
        console.log("📌 Enviando JSON a la API:", JSON.stringify(payload)); // Depuración
    
        try {
            const response = await fetch(`${API_URL}/gastos/`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });
    
            const result = await response.json();
            if (!response.ok) {
                throw new Error(result.message || "Error desconocido al añadir el gasto");
            }
    
            alert("Gasto añadido correctamente.");
            document.getElementById("nombreGasto").value = "";
            document.getElementById("valorGasto").value = "";
    
        } catch (error) {
            console.error("🚨 Error al añadir el gasto:", error);
            alert(`Error: ${error.message}`);
        }
    };
    

    const crearReporte = () => {
        navigate(`/resultados/${id_reporte}`); 
    };

    const regresar = () => {
        navigate('/');
    };

    useEffect(() => {
        fetchReporte();
    }, [id_reporte]);

    return (
        <div className="main-Reporte">
            <div className="head-Reporte">
                <h1 id="nombreMes">{nombreMes || "Cargando..."}</h1>
            </div>
            <div className="body-reporte">
                <div className="ordenes-reporte">
                    <h2>Órdenes</h2>
                    <input type="text" placeholder="Número de orden" id="numeroOrden" />
                    <input type="text" placeholder="Valor de la orden" id="valorOrden" />
                    <button className="boton-reporte" onClick={addOrder}> Añadir orden</button>
                </div>
                <div className="ordenes-reporte">
                    <h2>Facturas</h2>
                    <input type="text" placeholder="Número de factura" id="numeroFactura" />
                    <input type="text" placeholder="Valor de la factura" id="valorFactura" />
                    <button className="boton-reporte" onClick={addFactura}> Añadir factura</button>
                </div>
                <div className="gastos-reporte">
                    <h2>Gastos</h2>
                    <input type="text" placeholder="Nombre del gasto" id="nombreGasto" />
                    <input type="number" placeholder="Valor del gasto" id="valorGasto" />
                    <button className="boton-reporte" onClick={addSpent}>Añadir gasto</button>
                </div>
            </div>
            <div className="exportacion-reporte">
                <button className="boton-regresar" onClick={regresar}>Regresar</button>
                <button className="boton-crear-reporte" onClick={crearReporte}>Crear y ver reporte</button>
            </div>
        </div>
    );
};

export default Reporte;
