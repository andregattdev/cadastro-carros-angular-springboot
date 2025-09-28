package com.api.api_backend.auth;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UsuarioService {

    @Autowired
    private LoginRepository loginRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    // 🔐 Cadastro com criptografia
    public Usuario cadastrarUsuario(Usuario usuario) {
        Optional<Usuario> existente = loginRepository.findByUsername(usuario.getUsername());
        if (existente.isPresent()) {
            throw new RuntimeException("Usuário já existe");
        }

        usuario.setPassword(passwordEncoder.encode(usuario.getPassword()));
        return loginRepository.save(usuario);
    }

    // 📋 Listar todos os usuários
    public List<Usuario> listarUsuarios() {
        return loginRepository.findAll();
    }

    // 🔍 Buscar por ID
    public Optional<Usuario> buscarPorId(Long id) {
        return loginRepository.findById(id);
    }

    // ✏️ Atualizar usuário
    public Usuario atualizarUsuario(Long id, Usuario usuarioAtualizado) {
        Usuario usuario = loginRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado"));

        usuario.setUsername(usuarioAtualizado.getUsername());
        usuario.setRole(usuarioAtualizado.getRole());

        // Atualiza senha se vier preenchida
        if (usuarioAtualizado.getPassword() != null && !usuarioAtualizado.getPassword().isEmpty()) {
            usuario.setPassword(passwordEncoder.encode(usuarioAtualizado.getPassword()));
        }

        return loginRepository.save(usuario);
    }

    // ❌ Excluir usuário
    public void excluirUsuario(Long id) {
        loginRepository.deleteById(id);
    }
}