package com.api.api_backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.api.api_backend.entity.Marca;

public interface MarcaRepository extends JpaRepository<Marca, Long> {
    public List<Marca> findByNomeContainingIgnoreCase(String nome);
}
