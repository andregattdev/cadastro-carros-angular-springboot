package com.api.api_backend.auth;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class CadastroService {

   @Autowired
    private LoginRepository loginRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public Usuario cadastrarUsuario(Usuario usuario) {
        // Criptografa automaticamente a senha recebida
        usuario.setPassword(passwordEncoder.encode(usuario.getPassword()));

        return loginRepository.save(usuario);
    }

}
