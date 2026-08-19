package com.aadi.hrms.dto;

import com.aadi.hrms.entity.EmployeeStatus;
import com.aadi.hrms.entity.Gender;
import jakarta.validation.constraints.*;
import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDate;

@Data
public class EmployeeRequestDto {

    @NotBlank(message = "Employee code is required")
    @Size(max = 20, message = "Employee code cannot exceed 20 characters")
    private String employeeCode;

    @NotBlank(message = "First name is required")
    @Size(min = 2, max = 50)
    private String firstName;

    @NotBlank(message = "Last name is required")
    @Size(min = 2, max = 50)
    private String lastName;


    @Pattern(
            regexp = "^[0-9]{10}$",
            message = "Phone number must contain exactly 10 digits"
    )
    private String phone;

    @NotNull(message = "Gender is required")
    private Gender gender;

    @Past(message = "Date of birth must be in the past")
    private LocalDate dateOfBirth;

    @NotNull(message = "Joining date is required")
    private LocalDate joiningDate;

    @NotBlank(message = "Designation is required")
    @Size(max = 100)
    private String designation;

    @NotNull(message = "Salary is required")
    @DecimalMin(value = "0.0", inclusive = false,
            message = "Salary must be greater than 0")
    private BigDecimal salary;

    @NotNull(message = "Department is required")
    private Long departmentId;

    private Long managerId;

    private EmployeeStatus status;

    private String profileImage;

    @NotNull(message = "User is required")
    private Long userId;
}

