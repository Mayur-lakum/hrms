package com.aadi.hrms.service;


import com.aadi.hrms.entity.Role;


import java.util.List;
import java.util.Optional;


public interface RoleService {

    Role saveRole(Role role);

    List<Role> getAllRoles();

    Optional<Role>getRoleById(Long id);

    Optional<Role> getRoleByName(String roleName);

    void deleteRole(Long id);

}
