package com.aadi.hrms.controller;

import com.aadi.hrms.entity.Role;
import com.aadi.hrms.service.RoleService;
import jakarta.persistence.Column;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/roles")
public class RoleController {

private final RoleService roleService;

public RoleController(RoleService roleService)
{
        this.roleService = roleService;
    }


    @PostMapping
  public ResponseEntity<Role>createRole(@RequestBody Role role){
    Role saveRole=roleService.saveRole(role);
   return new  ResponseEntity<>(saveRole, HttpStatus.CREATED);
}


  @GetMapping
  public ResponseEntity<List<Role>>getAllRoles(){
    return ResponseEntity.ok(roleService.getAllRoles());

}


@GetMapping("/{id}")
    public ResponseEntity<Role>getRoleById(@PathVariable Long id){


    return roleService.getRoleById(id).map(ResponseEntity::ok)
            .orElse(ResponseEntity.notFound().build());
}


    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteRole(@PathVariable Long id) {

        roleService.deleteRole(id);

        return ResponseEntity.ok("Role deleted successfully.");

    }

}

