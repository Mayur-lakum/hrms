package com.aadi.hrms.dto;


import com.aadi.hrms.entity.LeaveType;
import jakarta.validation.constraints.FutureOrPresent;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.time.LocalDate;

@Data
public class LeaveRequestDto {

    @NotNull(message = "Employee is required")
    private Long employeeId;

    @NotNull(message = "Leave Type is required")
    private LeaveType leaveType;

    @NotNull(message = "Start Date is required")
    @FutureOrPresent(message = "Start date cannot be in the past")
     private LocalDate startDate;

    @NotNull(message = "End date is required")
    private LocalDate endDate;

    @NotNull(message = "Valid reason  is required")
    private String reason;

}
