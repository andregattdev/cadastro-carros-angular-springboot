package com.api.api_backend.entity;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Carro {

    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    private long id;

    private String nome;

    private String modelo;

    private int ano;

    @ManyToOne
    @JsonIgnoreProperties("carros")
	private Marca marca;

    @ManyToMany
    @JoinTable(name="carro_acessorio")
    private List<Acessorio> acessorios;

    @ManyToMany
    @JoinTable(name="carro_proprietario")
    private List<Proprietario> proprietarios;

}
