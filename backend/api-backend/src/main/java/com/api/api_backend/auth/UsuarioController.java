package com.api.api_backend.auth;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/cadastro")
@CrossOrigin("*")
public class UsuarioController {

    @Autowired
    private UsuarioService usuarioService;

    @PreAuthorize("hasAuthority('ADMIN')")
    @GetMapping("/listar")
    public List<Usuario> listarUsuarios() {
        return usuarioService.listarUsuarios();
    }

  @PostMapping
public ResponseEntity<Usuario> cadastrar(@RequestBody UsuarioCadastroDTO dto) {
    Usuario usuario = new Usuario();
    usuario.setUsername(dto.getUsername());
    usuario.setPassword(dto.getPassword());
    usuario.setRole(dto.getRole());

    Usuario criado = usuarioService.cadastrarUsuario(usuario);
    return ResponseEntity.status(HttpStatus.CREATED).body(criado);
}
    /*
     * @GetMapping("/usuarios")
     * public List<Usuario> listarUsuarios() {
     * return usuarioService.listarUsuarios();
     * }
     */

    @GetMapping("/usuarios/{id}")
    public ResponseEntity<Usuario> buscarPorId(@PathVariable Long id) {
        return usuarioService.buscarPorId(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

   @PutMapping("/usuarios/{id}")
public ResponseEntity<Usuario> atualizar(@PathVariable Long id, @RequestBody Usuario usuario) {
    return ResponseEntity.ok(usuarioService.atualizarUsuario(id, usuario));
}

    @DeleteMapping("/usuarios/{id}")
    public ResponseEntity<Void> excluir(@PathVariable Long id) {
        usuarioService.excluirUsuario(id);
        return ResponseEntity.noContent().build();
    }
}
