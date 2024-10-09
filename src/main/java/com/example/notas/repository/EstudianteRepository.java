package com.example.notas.repository;

import com.example.notas.model.Estudiante;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EstudianteRepository extends JpaRepository<Estudiante, Long> {
    // Aquí puedes agregar métodos de consulta personalizados si es necesario
}
