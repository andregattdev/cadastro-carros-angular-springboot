package com.api.api_backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.api.api_backend.entity.Acessorio;



public interface AcessorioRepository extends JpaRepository<Acessorio, Long> {

	public List<Acessorio> findByNomeContainingIgnoreCase(String nome);


}
