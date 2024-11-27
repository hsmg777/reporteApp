import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import './styles/Reporte.css';

const Reporte = () => {
    const { id_reporte } = useParams(); // obtener el id_reporteMensual de la URL
    const [nombreMes, setNombreMes] = useState(""); 

    // Obtener los detalles del reporte
    const fetchReporte = async () => {
        try {
            const response = await fetch(`http://127.0.0.1:5000/tasks/reportes/${id_reporte}`);
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
        const response = await fetch('http://127.0.0.1:5000/tasks/ordenes', {
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

    
    // Añadir un gasto
    const addSpent = async () => {
        const nombreGasto = document.getElementById("nombreGasto").value;
        const valorGasto = document.getElementById("valorGasto").value;

        
        if (!nombreGasto || !valorGasto) {
            alert("Por favor, complete todos los campos del gasto.");
            return;
        }

        try {
            const response = await fetch('http://127.0.0.1:5000/tasks/gastos/', {
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

    const crearReporte = () =>{
        

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
                <button className="boton-crear-reporte" onClick={crearReporte}>Crear y ver reporte</button>
            </div>
        </div>
    );
};

export default Reporte;
