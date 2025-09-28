package com.api.api_backend.auth;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UsuarioCadastroDTO {
    private String username;
    private String password;
    private String role;


}