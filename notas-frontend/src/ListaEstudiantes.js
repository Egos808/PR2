import React from 'react'; // Importación de React
// Componente que recibe la lista de estudiantes como una prop
const ListaEstudiantes = ({ estudiantes }) => {
 return (
 <div>
 <h2>Lista de Estudiantes</h2>
 {/* Condición para mostrar un mensaje si no hay estudiantes registrados */}
 {estudiantes.length === 0 ? (
 <p>No hay estudiantes registrados.</p>
 ) : (
 // Si hay estudiantes, se muestra una lista desordenada (ul)
 <ul>
 {/* Mapea la lista de estudiantes y crea un <li> para cada uno */}
 {estudiantes.map((estudiante) => (
 // Se utiliza el id del estudiante como clave única para cada elemento de la lista
 <li key={estudiante.id}>
 {/* Se muestran los datos del estudiante */}
 <p>Nombre: {estudiante.nombre}</p>
 <p>Actividades: {estudiante.actividades}</p>
 <p>Primer Parcial: {estudiante.primerParcial}</p>
 <p>Segundo Parcial: {estudiante.segundoParcial}</p>
 <p>Examen Final: {estudiante.examenFinal}</p>
 <p>Puntaje Total: {estudiante.puntajeTotal}</p>
 </li>
 ))}
 </ul>
 )}
 </div>
 );
};
export default ListaEstudiantes; // Exportar el componente para su uso en otros archivos