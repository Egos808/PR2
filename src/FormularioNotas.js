import React, { useState } from 'react'; // Importación de React y del hook useState para manejar el estado
import axios from 'axios'; // Importación de axios para hacer solicitudes HTTP
const FormularioNotas = ({ onNotaAgregada }) => {
 // Definición de los estados locales para manejar los campos del formulario
 const [nombre, setNombre] = useState(''); // Estado para almacenar el nombre del estudiante
 const [actividades, setActividades] = useState(''); // Estado para almacenar la nota de actividades
 const [primerParcial, setPrimerParcial] = useState(''); // Estado para la nota del primer parcial
 const [segundoParcial, setSegundoParcial] = useState(''); // Estado para la nota del segundo parcial
 const [examenFinal, setExamenFinal] = useState(''); // Estado para la nota del examen final
 const [mensajeExito, setMensajeExito] = useState(''); // Estado para manejar el mensaje de éxito
 // Función que maneja el envío del formulario
 const manejarSubmit = (e) => {
 e.preventDefault(); // Evita que el formulario recargue la página por defecto
 // Crear un objeto con los datos del estudiante y convertir las notas a enteros
 const nuevaNota = {
 nombre,
 actividades: parseInt(actividades), // Convierte la nota de actividades a entero
 primerParcial: parseInt(primerParcial), // Convierte la nota del primer parcial a entero
 segundoParcial: parseInt(segundoParcial), // Convierte la nota del segundo parcial a entero
 examenFinal: parseInt(examenFinal), // Convierte la nota del examen final a entero
 };
 // Enviar los datos al servidor mediante una solicitud POST usando axios
 axios.post('http://localhost:8080/api/estudiantes', nuevaNota)
 .then(response => {
 onNotaAgregada(response.data); // Actualiza el estado en el componente padre (App.js)
 // Limpiar los campos del formulario después de enviar
 setNombre('');
 setActividades('');
 setPrimerParcial('');
 setSegundoParcial('');
 setExamenFinal('');
 // Mostrar mensaje de éxito
 setMensajeExito('¡Nota registrada con éxito!');
 // Limpiar el mensaje de éxito después de 3 segundos
 setTimeout(() => setMensajeExito(''), 3000);
 })
 .catch(error => {
 console.error('Error al agregar el estudiante:', error); // Muestra un error en la consola si algo falla
 });
 };
 // Retorna el formulario con sus respectivos campos y el botón para enviar
 return (
 <form onSubmit={manejarSubmit}>
 <h2>Registrar Notas</h2>
 {/* Mostrar mensaje de éxito si existe */}
 {mensajeExito && <p style={{ color: 'green' }}>{mensajeExito}</p>}
 <div>
 <label>Nombre del Estudiante:</label>
 <input type="text" value={nombre} onChange={(e) => setNombre(e.target.value)} required />
 </div>
 <div>
 <label>Actividades (Máx. 35):</label>
 <input type="number" value={actividades} onChange={(e) => setActividades(e.target.value)} required />
 </div>
 <div>
 <label>Primer Parcial (Máx. 15):</label>
 <input type="number" value={primerParcial} onChange={(e) => setPrimerParcial(e.target.value)} required 
/>
 </div>
 <div>
 <label>Segundo Parcial (Máx. 15):</label>
 <input type="number" value={segundoParcial} onChange={(e) => setSegundoParcial(e.target.value)} 
required />
 </div>
 <div>
 <label>Examen Final (Máx. 35):</label>
 <input type="number" value={examenFinal} onChange={(e) => setExamenFinal(e.target.value)} required />
 </div>
 <button type="submit">Registrar</button> {/* Botón para enviar el formulario */}
 </form>
 );
};
export default FormularioNotas; // Exportar el componente para ser usado en otros archivos