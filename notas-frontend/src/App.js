import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [nombre, setNombre] = useState('');
  const [actividades, setActividades] = useState(0);
  const [primerParcial, setPrimerParcial] = useState(0);
  const [segundoParcial, setSegundoParcial] = useState(0);
  const [examenFinal, setExamenFinal] = useState(0);
  const [estudiantes, setEstudiantes] = useState([]);
  const [estudianteId, setEstudianteId] = useState(null);
  const [puntajeTotal, setPuntajeTotal] = useState(0);

  // Función para calcular el puntaje total
  const calcularPuntajeTotal = () => {
    return (
      (parseInt(actividades) || 0) +
      (parseInt(primerParcial) || 0) +
      (parseInt(segundoParcial) || 0) +
      (parseInt(examenFinal) || 0)
    );
  };

  // Efecto para actualizar el puntaje total cada vez que cambian los campos
  useEffect(() => {
    setPuntajeTotal(calcularPuntajeTotal());
  }, [actividades, primerParcial, segundoParcial, examenFinal]); // Añadimos las dependencias necesarias

  const handleRegistrar = async (e) => {
    e.preventDefault();
    const nuevoEstudiante = {
      nombre,
      actividades,
      primerParcial,
      segundoParcial,
      examenFinal,
      puntajeTotal, // Asegúrate de que se envíe el puntaje total
    };

    const response = await fetch('http://localhost:8080/api/estudiantes', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(nuevoEstudiante),
    });

    if (response.ok) {
      alert('Estudiante registrado correctamente');
      fetchEstudiantes(); // Refrescar lista de estudiantes
      resetForm(); // Limpiar el formulario después de registrar
    } else {
      alert('Error al registrar el estudiante');
    }
  };

  const fetchEstudiantes = async () => {
    const response = await fetch('http://localhost:8080/api/estudiantes');
    const data = await response.json();
    setEstudiantes(data); // Actualizar la lista de estudiantes
  };

  useEffect(() => {
    fetchEstudiantes(); // Cargar estudiantes al iniciar la página
  }, []);

  const handleEdit = (estudiante) => {
    setNombre(estudiante.nombre);
    setActividades(estudiante.actividades);
    setPrimerParcial(estudiante.primerParcial);
    setSegundoParcial(estudiante.segundoParcial);
    setExamenFinal(estudiante.examenFinal);
    setEstudianteId(estudiante.id); // Guardar el ID del estudiante
    setPuntajeTotal(estudiante.puntajeTotal); // Asegúrate de establecer el puntaje total al editar
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const updatedPuntajeTotal = calcularPuntajeTotal(); // Calcula el puntaje total al actualizar
    const updatedEstudiante = {
      nombre,
      actividades,
      primerParcial,
      segundoParcial,
      examenFinal,
      puntajeTotal: updatedPuntajeTotal, // Asegúrate de que el puntaje total se esté enviando actualizado
    };

    const response = await fetch(`http://localhost:8080/api/estudiantes/${estudianteId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedEstudiante),
    });

    if (response.ok) {
      alert('Estudiante actualizado correctamente');
      fetchEstudiantes();
      resetForm();
    } else {
      const errorMessage = await response.text();
      alert(`No se pudo actualizar el estudiante: ${errorMessage}`);
    }
  };

  const handleDelete = async (id) => {
    const response = await fetch(`http://localhost:8080/api/estudiantes/${id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      alert('Estudiante eliminado correctamente');
      fetchEstudiantes();
    } else {
      alert('Error al eliminar el estudiante');
    }
  };

  const resetForm = () => {
    setNombre('');
    setActividades(0);
    setPrimerParcial(0);
    setSegundoParcial(0);
    setExamenFinal(0);
    setEstudianteId(null);
    setPuntajeTotal(0); // Opcional, pero ayuda a resetear el total
  };

  return (
    <div className="App">
      <h1>Sistema de Registro de Notas</h1>

      <form onSubmit={estudianteId ? handleUpdate : handleRegistrar}>
        <h2>{estudianteId ? 'Actualizar Notas' : 'Registrar Notas'}</h2>
        <label>Nombre del Estudiante:</label>
        <input type="text" value={nombre} onChange={(e) => setNombre(e.target.value)} required />

        <label>Actividades (Máx. 35):</label>
        <input type="number" value={actividades} onChange={(e) => setActividades(e.target.value)} max="35" required />

        <label>Primer Parcial (Máx. 15):</label>
        <input type="number" value={primerParcial} onChange={(e) => setPrimerParcial(e.target.value)} max="15" required />

        <label>Segundo Parcial (Máx. 15):</label>
        <input type="number" value={segundoParcial} onChange={(e) => setSegundoParcial(e.target.value)} max="15" required />

        <label>Examen Final (Máx. 35):</label>
        <input type="number" value={examenFinal} onChange={(e) => setExamenFinal(e.target.value)} max="35" required />

        <button type="submit">{estudianteId ? 'Actualizar' : 'Registrar'}</button>
      </form>

      <h2>Lista de Estudiantes</h2>
      <ul>
        {estudiantes.length > 0 ? (
          estudiantes.map((estudiante) => (
            <li key={estudiante.id}>
              {estudiante.nombre} - Actividades: {estudiante.actividades}, Primer Parcial: {estudiante.primerParcial}, Segundo Parcial: {estudiante.segundoParcial}, Examen Final: {estudiante.examenFinal}, Puntaje Total: {estudiante.puntajeTotal}
              <button onClick={() => handleEdit(estudiante)}>Editar</button>
              <button onClick={() => handleDelete(estudiante.id)}>Eliminar</button>
            </li>
          ))
        ) : (
          <p>No hay estudiantes registrados.</p>
        )}
      </ul>
    </div>
  );
}

export default App;
