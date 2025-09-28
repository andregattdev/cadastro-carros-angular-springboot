package com.api.api_backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.api.api_backend.entity.Carro;
import com.api.api_backend.entity.Marca;

public interface CarroRepository extends JpaRepository<Carro, Long>{

    public List<Carro> findByNomeContainingIgnoreCase(String nome);

    public List<Carro> findByMarca(Marca marca);

    @Query("FROM Carro c WHERE c.ano > :ano")
    public List<Carro> findAcimaAno(int ano);

}
