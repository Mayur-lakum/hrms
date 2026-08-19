package com.aadi.hrms.service;

import com.aadi.hrms.dto.EmployeeRequestDto;
import com.aadi.hrms.dto.EmployeeResponseDto;
import org.jspecify.annotations.Nullable;
import org.springframework.data.domain.Page;


import java.util.List;

public interface EmployeeService
{

    EmployeeResponseDto createEmployee(EmployeeRequestDto request);

    EmployeeResponseDto getEmployeeById(Long id);

//    List<EmployeeResponseDto> getAllEmployees();
    //pagination introduced to improvise


Page<EmployeeResponseDto> getAllEmployees(
        int page,
        int size,
        String sortBy,
        String sortDir
);

    EmployeeResponseDto updateEmployee(Long id, EmployeeRequestDto request);

    void deleteEmployee(Long id);

    EmployeeResponseDto getEmployeeByEmail(String email);
}
