package com.aadi.hrms.dto;

import com.aadi.hrms.entity.EmployeeStatus;
import com.aadi.hrms.entity.Gender;
import lombok.Builder;
import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDate;

@Data
@Builder
public class EmployeeResponseDto {

    private Long id;

    private String employeeCode;

    private String firstName;

    private String lastName;

    private String email;

    private String phone;

    private Gender gender;

    private LocalDate dateOfBirth;

    private LocalDate joiningDate;

    private String designation;

    private BigDecimal salary;

    private Long departmentId;

    private String departmentName;

    private Long managerId;

    private String managerName;

    private EmployeeStatus status;

    private String profileImage;

    private Long userId;
}

