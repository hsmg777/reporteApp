import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import './styles/Reporte.css';

const Reporte = () => {
    const { id_reporte } = useParams(); // obtener el id_reporteMensual de la URL
    const [nombreMes, setNombreMes] = useState(""); 
    const navigate = useNavigate();

    // Obtener los detalles del reporte
    const fetchReporte = async () => {
        try {
            const response = await fetch(`https://fastcleaningapp-latest.onrender.com/tasks/reportes/${id_reporte}`);
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

        // Crear el payload
        const payload = {
            id_reporteMensual: parseInt(id_reporte),
            numeroOrden: parseInt(numeroOrden),
            valor: parseFloat(valorOrden),
        };

        console.log("Enviando JSON:", payload); 

        try {
            const response = await fetch('https://fastcleaningapp-latest.onrender.com/tasks/ordenes', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload),
            });

            if (response.ok) {
                alert("Orden añadida correctamente.");
                document.getElementById("numeroOrden").value = ""; 
                document.getElementById("valorOrden").value = "";
            } else {
                const errorData = await response.json(); 
                console.error("Error del servidor:", errorData);
                alert(`Error al añadir la orden: ${errorData.message || "Error desconocido"}`);
            }
        } catch (error) {
            console.error("Error al añadir la orden:", error);
            alert("Error al añadir la orden.");
        }
    };

    const addFactura = async () => {
        const numeroFactura = document.getElementById("numeroFactura").value;
        const valorFactura = document.getElementById("valorFactura").value;

        if (!numeroFactura || !valorFactura) {
            alert("Por favor, complete todos los campos de la factura.");
            return;
        }

        // Crear el payload
        const payload = {
            id_reporteMensual: parseInt(id_reporte),
            numeroFactura: parseInt(numeroFactura),
            valor: parseFloat(valorFactura),
        };

        console.log("Enviando JSON para factura:", payload);

        try {
            const response = await fetch('https://fastcleaningapp-latest.onrender.com/tasks/facturas', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload),
            });

            if (response.ok) {
                alert("Factura añadida correctamente.");
                document.getElementById("numeroFactura").value = ""; 
                document.getElementById("valorFactura").value = "";
            } else {
                const errorData = await response.json();
                console.error("Error del servidor:", errorData);
                alert(`Error al añadir la factura: ${errorData.message || "Error desconocido"}`);
            }
        } catch (error) {
            console.error("Error al añadir la factura:", error);
            alert("Error al añadir la factura.");
        }
    };

    const addSpent = async () => {
        const nombreGasto = document.getElementById("nombreGasto").value;
        const valorGasto = document.getElementById("valorGasto").value;

        if (!nombreGasto || !valorGasto) {
            alert("Por favor, complete todos los campos del gasto.");
            return;
        }

        try {
            const response = await fetch('https://fastcleaningapp-latest.onrender.com/tasks/gastos/', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    id_reporteMensual: parseInt(id_reporte), 
                    nombreGasto: nombreGasto,
                    valor: parseFloat(valorGasto),
                }),
            });

            if (response.ok) {
                alert("Gasto añadido correctamente.");
                document.getElementById("nombreGasto").value = ""; 
                document.getElementById("valorGasto").value = "";
            } else {
                alert("Error al añadir el gasto.");
            }
        } catch (error) {
            console.error("Error al añadir el gasto:", error);
            alert("Error al añadir el gasto.");
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
                    <h2>Ordenes</h2>
                    <p>Ingrese el número de orden:</p>
                    <input type="text" placeholder="Número de orden" id="numeroOrden" />
                    <p>Ingrese el valor de la orden:</p>
                    <input type="text" placeholder="Valor de la orden" id="valorOrden" />
                    <button className="boton-reporte" onClick={addOrder}> Añadir orden</button>
                </div>
                <div className="ordenes-reporte">
                    <h2>Facturas</h2>
                    <p>Ingrese el número de Factura:</p>
                    <input type="text" placeholder="Número de factura" id="numeroFactura" />
                    <p>Ingrese el valor de la Factura:</p>
                    <input type="text" placeholder="Valor de la factura" id="valorFactura" />
                    <button className="boton-reporte" onClick={addFactura}> Añadir factura</button>
                </div>
                <div className="gastos-reporte">
                    <h2>Gastos</h2>
                    <p>Ingrese el nombre del gasto:</p>
                    <input type="text" placeholder="Nombre del gasto" id="nombreGasto" />
                    <p>Ingrese el valor del gasto:</p>
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
