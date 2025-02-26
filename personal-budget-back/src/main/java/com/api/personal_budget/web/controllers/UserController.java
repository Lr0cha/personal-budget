package com.api.personal_budget.web.controllers;

import com.api.personal_budget.entities.User;
import com.api.personal_budget.services.UserService;
import com.api.personal_budget.web.dto.user.UpdatePasswordDto;
import com.api.personal_budget.web.dto.user.UserCreateDto;
import com.api.personal_budget.web.dto.user.UserResponseDto;
import com.api.personal_budget.web.dto.mapper.UserMapper;
import com.api.personal_budget.web.exceptions.ErrorMessage;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Tag(name = "Usuário", description = "Contém todas operações relativas a cadastro, edição, exclusão e leitura de um usuário")
@RestController
@RequestMapping("api/v1/usuarios")
public class UserController {
    @Autowired
    UserService service;

    @Operation(summary="Obter todos os usuários",description = "Recurso para criar um novo usuário")
    @GetMapping("/info")
    public ResponseEntity<List<UserResponseDto>> findAll(){
        List<User> users = service.findAll();
        return ResponseEntity.ok().body(UserMapper.toListDto(users));
    }

    @Operation(summary="Recuperar usuário",description = "Recurso para recuperar usuário que está autenticado",
            responses = {
                    @ApiResponse(responseCode = "200", description = "Recurso encontrado com sucesso",
                            content = @Content(mediaType = "application/json", schema = @Schema(implementation = UserResponseDto.class))),
                    @ApiResponse(responseCode = "401", description = "Recurso não autorizado",
                            content = @Content(mediaType = "application/json", schema = @Schema(implementation = Void.class)))
            })
    @GetMapping
    public ResponseEntity<UserResponseDto> findUserAuthenticated(){
        User user = service.findUserAuthenticated();
        return ResponseEntity.ok().body(UserMapper.toDto(user));
    }

    @Operation(summary="Criar um usuário",description = "Recurso para criar um novo usuário",
            responses = {
                    @ApiResponse(responseCode = "201", description = "Recurso criado com sucesso",
                            content = @Content(mediaType = "application/json", schema = @Schema(implementation = UserResponseDto.class))),
                    @ApiResponse(responseCode = "409", description = "Username já cadastrado no sistema",
                            content = @Content(mediaType = "application/json", schema = @Schema(implementation = ErrorMessage.class))),
                    @ApiResponse(responseCode = "422", description = "Recurso não processado por dados de entrada inválidos",
                            content = @Content(mediaType = "application/json", schema = @Schema(implementation = ErrorMessage.class))),
                    @ApiResponse(responseCode = "401", description = "Recurso não autorizado",
                            content = @Content(mediaType = "application/json", schema = @Schema(implementation = Void.class)))
            })
    @PostMapping
    public ResponseEntity<UserResponseDto> insert(@Valid @RequestBody UserCreateDto obj){
        User user = service.insert(UserMapper.toUser(obj));
        return ResponseEntity.status(HttpStatus.CREATED).body(UserMapper.toDto(user));
    }

    @Operation(summary="Atualizar usuário",description = "Recurso para atualizar senha do usuário autenticado",
            responses = {
                    @ApiResponse(responseCode = "204", description = "Recurso atualizado com sucesso",
                            content = @Content(mediaType = "application/json", schema = @Schema(implementation = Void.class))),
                    @ApiResponse(responseCode = "400", description = "Username e senha não coincidem",
                            content = @Content(mediaType = "application/json", schema = @Schema(implementation = ErrorMessage.class))),
                    @ApiResponse(responseCode = "422", description = "Recurso não processado por dados de entrada inválidos",
                            content = @Content(mediaType = "application/json", schema = @Schema(implementation = ErrorMessage.class))),
                    @ApiResponse(responseCode = "401", description = "Recurso não autorizado",
                            content = @Content(mediaType = "application/json", schema = @Schema(implementation = Void.class)))
            })
    @PatchMapping
    public ResponseEntity<Void> updatePassword(@Valid @RequestBody UpdatePasswordDto obj){
        service.updatePassword(obj.getUsername() , obj.getCurrentPassword(), obj.getNewPassword(), obj.getConfirmPassword());
        return ResponseEntity.noContent().build();
    }

    @Operation(summary="Deletar usuário",description = "Recurso para excluir o usuário autenticado",
            responses = {
                    @ApiResponse(responseCode = "204", description = "Recurso excluido com sucesso",
                            content = @Content(mediaType = "application/json", schema = @Schema(implementation = Void.class))),
                    @ApiResponse(responseCode = "401", description = "Recurso não autorizado",
                            content = @Content(mediaType = "application/json", schema = @Schema(implementation = Void.class)))
            })
    @DeleteMapping
    public ResponseEntity<Void> deleteUserAuthenticated(){
        service.deleteUserAuthenticated();
        return ResponseEntity.noContent().build();
    }
}
