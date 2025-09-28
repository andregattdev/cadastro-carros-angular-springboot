package com.api.api_backend.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.api.api_backend.entity.Carro;
import com.api.api_backend.entity.Marca;
import com.api.api_backend.repository.CarroRepository;

@Service
public class CarroService {

    @Autowired
    private CarroRepository carroRepository;

    public String save(Carro carro) {
        this.carroRepository.save(carro);
        return carro.getNome() + " salvo com sucesso";
    }

    public List<Carro> listAll() {
        return this.carroRepository.findAll();
    }

    public Carro findById(long idCarro) {
        Optional<Carro> carro = this.carroRepository.findById(idCarro);
        if (carro.isPresent())
            return carro.get();
        else
            return null;
    }

    public List<Carro> findByNome(String nome) {
        return this.carroRepository.findByNomeContainingIgnoreCase(nome);
    }

    
    public List<Carro> findByMarca(long idMarca) {
        Marca marca = new Marca();
        return this.carroRepository.findByMarca(marca);
        
    }
    

    public List<Carro> findAcimaAno(int ano) {
        return this.carroRepository.findAcimaAno(ano);
    }

    public String update(Carro carro, long id) {
        carro.setId(id);
        this.carroRepository.save(carro);
        return "Carro atualizado com sucesso";
    }

    public String delete(long idCarro) {
        this.carroRepository.deleteById(idCarro);
        return "Carro deletado com sucesso!";
}
}