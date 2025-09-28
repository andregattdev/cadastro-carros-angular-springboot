package com.api.api_backend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.api.api_backend.entity.Carro;
import com.api.api_backend.service.CarroService;

@RestController
@RequestMapping("api/carro")
@CrossOrigin(origins = "http://localhost:4200") // * é para treinamento, o correto é usar a porta correta exemplo: 4200
public class CarroController {

    @Autowired
    private CarroService carroService;

    @PostMapping("/save")
    public ResponseEntity<String> save(@RequestBody Carro carro) {
        String mensagem = this.carroService.save(carro);
        return new ResponseEntity<>(mensagem, HttpStatus.OK);
    }

    @GetMapping("/listAll")
    public ResponseEntity<List<Carro>> listAll() {
        try {
            List<Carro> lista = this.carroService.listAll();
            return new ResponseEntity<>(lista, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/findByNome")
    public ResponseEntity<List<Carro>> findByNome(@RequestParam String nome) {
        List<Carro> lista = this.carroService.findByNome(nome);
        return new ResponseEntity<>(lista, HttpStatus.OK);
    }

    
    @GetMapping("/findByMarca")
    public ResponseEntity<List<Carro>> findByMarca(@RequestParam long idMarca) {
        try {
            List<Carro> lista = this.carroService.findByMarca(idMarca);
            return new ResponseEntity<>(lista, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        }
    }
    

    @GetMapping("/findAcimaAno")
    public ResponseEntity<List<Carro>> findAcimaAno(@RequestParam int ano) {
        try {
            List<Carro> lista = this.carroService.findAcimaAno(ano);
            return new ResponseEntity<>(lista, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/findById/{idCarro}")
    public ResponseEntity<Carro> findById(@PathVariable("idCarro") long id) {
        Carro carro = this.carroService.findById(id);
        return new ResponseEntity<>(carro, HttpStatus.OK);
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<String> update(@RequestBody Carro carro, @PathVariable long id) {
        String mensagem = this.carroService.update(carro, id);
        return new ResponseEntity<>(mensagem, HttpStatus.OK);
    }

    @DeleteMapping("/deleteById/{id}")
    public ResponseEntity<String> deleteById(@PathVariable long id) {
        String mensagem = this.carroService.delete(id);
        return new ResponseEntity<>(mensagem, HttpStatus.OK);
    }

}
