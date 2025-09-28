package com.api.api_backend.entity;

import java.util.List;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Marca {

    
    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    private long id;

    @NotBlank(message = "Nome da marca é obrigatorio!")
    private String nome;

    private String cnpj;

    @OneToMany(mappedBy = "marca")
    private List<Carro> carros;

}
