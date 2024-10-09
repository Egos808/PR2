package com.example.notas.controller;

import com.example.notas.model.Estudiante;
import com.example.notas.service.EstudianteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/estudiantes")
@CrossOrigin(origins = "http://localhost:3000") // Permite solicitudes desde localhost:3000
public class EstudianteController {

    @Autowired
    private EstudianteService estudianteService;

    // Obtener todos los estudiantes
    @GetMapping
    public List<Estudiante> obtenerTodos() {
        return estudianteService.obtenerTodos();
    }

    // Obtener estudiante por ID
    @GetMapping("/{id}")
    public ResponseEntity<Estudiante> obtenerPorId(@PathVariable Long id) {
        Estudiante estudiante = estudianteService.obtenerPorId(id);
        if (estudiante == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(estudiante);
    }

    // Crear nuevo estudiante
    @PostMapping
    public Estudiante crearEstudiante(@RequestBody Estudiante estudiante) {
        return estudianteService.guardar(estudiante);
    }

    // Actualizar estudiante
    @PutMapping("/{id}")
    public ResponseEntity<Estudiante> actualizarEstudiante(@PathVariable Long id,
            @RequestBody Estudiante estudianteDetails) {
        Estudiante estudiante = estudianteService.obtenerPorId(id);
        if (estudiante == null) {
            return ResponseEntity.notFound().build();
        }

        // Actualizar los detalles del estudiante
        estudiante.setNombre(estudianteDetails.getNombre());
        estudiante.setActividades(estudianteDetails.getActividades());
        estudiante.setPrimerParcial(estudianteDetails.getPrimerParcial());
        estudiante.setSegundoParcial(estudianteDetails.getSegundoParcial());
        estudiante.setExamenFinal(estudianteDetails.getExamenFinal());

        // Calcular el puntaje total antes de guardar
        double puntajeTotal = calcularPuntajeTotal(estudiante);
        estudiante.setPuntajeTotal(puntajeTotal);

        Estudiante estudianteActualizado = estudianteService.guardar(estudiante);
        return ResponseEntity.ok(estudianteActualizado);
    }

    // Eliminar estudiante
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminarEstudiante(@PathVariable Long id) {
        Estudiante estudiante = estudianteService.obtenerPorId(id);
        if (estudiante == null) {
            return ResponseEntity.notFound().build();
        }

        estudianteService.eliminar(id);
        return ResponseEntity.noContent().build(); // 204 No Content
    }

    // Método para calcular el puntaje total (puedes moverlo a EstudianteService si prefieres)
    private double calcularPuntajeTotal(Estudiante estudiante) {
        return estudiante.getActividades() + estudiante.getPrimerParcial() +
               estudiante.getSegundoParcial() + estudiante.getExamenFinal();
    }
}
