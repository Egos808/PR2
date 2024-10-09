package com.example.notas.service;

import com.example.notas.model.Estudiante;
import com.example.notas.repository.EstudianteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class EstudianteService {

    @Autowired
    private EstudianteRepository estudianteRepository;

    // Obtener todos los estudiantes
    public List<Estudiante> obtenerTodos() {
        return estudianteRepository.findAll();
    }

    // Obtener estudiante por ID
    public Estudiante obtenerPorId(Long id) {
        Optional<Estudiante> estudiante = estudianteRepository.findById(id);
        return estudiante.orElse(null); // Devuelve null si no se encuentra
    }

    // Guardar (crear o actualizar) estudiante
    public Estudiante guardar(Estudiante estudiante) {
        // Calcular el puntaje total antes de guardar
        double puntajeTotal = calcularPuntajeTotal(estudiante);
        estudiante.setPuntajeTotal(puntajeTotal);
        return estudianteRepository.save(estudiante);
    }

    // Eliminar estudiante
    public void eliminar(Long id) {
        estudianteRepository.deleteById(id);
    }

    // Método para calcular el puntaje total
    private double calcularPuntajeTotal(Estudiante estudiante) {
        return estudiante.getActividades() + estudiante.getPrimerParcial() +
                estudiante.getSegundoParcial() + estudiante.getExamenFinal();
    }
}
