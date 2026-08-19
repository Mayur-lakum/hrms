package com.aadi.hrms.service;


import com.aadi.hrms.dto.DepartmentRequestDto;
import com.aadi.hrms.dto.DepartmentResponseDto;

import java.util.List;

public interface DepartmentService {

    DepartmentResponseDto createDepartment(DepartmentRequestDto request);

    DepartmentResponseDto getDepartmentById(Long id);

    List<DepartmentResponseDto> getAllDepartments();

    DepartmentResponseDto updateDepartment(
            Long id,
            DepartmentRequestDto request);

    void deleteDepartment(Long id);
}
