package com.aadi.hrms.service.impl;


import com.aadi.hrms.entity.Role;
import com.aadi.hrms.exception.ResourceNotFoundException;
import com.aadi.hrms.repository.RoleRepository;
import com.aadi.hrms.service.RoleService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class RoleServiceImpl implements RoleService {

    private final RoleRepository roleRepository;

    public RoleServiceImpl(RoleRepository repository)
    {
        this.roleRepository = repository;
    }

    @Override
    public Role saveRole(Role role) {
        return roleRepository.save(role);
    }

    @Override
    public List<Role> getAllRoles() {
        return roleRepository.findAll();
    }

    @Override
    public Optional<Role> getRoleById(Long id) {

        if (!roleRepository.existsById(id)) {
            throw new ResourceNotFoundException("Role not found with id : " + id);
        }

        return roleRepository.findById(id);
    }

    @Override
    public Optional<Role> getRoleByName(String roleName) {
        return roleRepository.findByRoleName(roleName);
    }

    @Override
    public void deleteRole(Long id) {

        roleRepository.deleteById(id);
    }
}
