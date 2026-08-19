package com.aadi.hrms.service.impl;

import com.aadi.hrms.dto.DepartmentRequestDto;
import com.aadi.hrms.dto.DepartmentResponseDto;
import com.aadi.hrms.entity.Department;
import com.aadi.hrms.exception.ResourceNotFoundException;
import com.aadi.hrms.repository.DepartmentRepository;
import com.aadi.hrms.service.DepartmentService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DepartmentServiceImpl implements DepartmentService {

    private final DepartmentRepository departmentRepository;

    public DepartmentServiceImpl(DepartmentRepository departmentRepository) {
        this.departmentRepository = departmentRepository;
    }

    @Override
    public DepartmentResponseDto createDepartment(
            DepartmentRequestDto request) {

        if (departmentRepository.existsByNameIgnoreCase(request.getName())) {
            throw new IllegalArgumentException(
                    "Department already exists: " + request.getName());
        }

        Department department = Department.builder()
                .name(request.getName())
                .description(request.getDescription())
                .active(request.getActive() != null
                        ? request.getActive()
                        : true)
                .build();

        Department savedDepartment =
                departmentRepository.save(department);

        return mapToResponse(savedDepartment);
    }

    @Override
    public DepartmentResponseDto getDepartmentById(Long id) {

        Department department = departmentRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Department not found with id: " + id));

        return mapToResponse(department);
    }

    @Override
    public List<DepartmentResponseDto> getAllDepartments() {

        return departmentRepository.findAll()
                .stream()
                .map(this::mapToResponse)
                .toList();
    }

    @Override
    public DepartmentResponseDto updateDepartment(
            Long id,
            DepartmentRequestDto request) {

        Department department = departmentRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Department not found with id: " + id));

        department.setName(request.getName());
        department.setDescription(request.getDescription());

        if (request.getActive() != null) {
            department.setActive(request.getActive());
        }

        Department updatedDepartment =
                departmentRepository.save(department);

        return mapToResponse(updatedDepartment);
    }

    @Override
    public void deleteDepartment(Long id) {

        Department department = departmentRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Department not found with id: " + id));

        departmentRepository.delete(department);
    }

    private DepartmentResponseDto mapToResponse(
            Department department) {

        return DepartmentResponseDto.builder()
                .id(department.getId())
                .name(department.getName())
                .description(department.getDescription())
                .active(department.getActive())
                .build();
    }
}