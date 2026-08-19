package com.aadi.hrms.dto;


import com.aadi.hrms.entity.AttendanceStatus;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.time.LocalDate;
import java.time.LocalTime;

@Data
public class AttendanceRequestDto {

    @NotNull(message = "Employee Id Required")
private Long employeeId;

    @NotNull(message = "Attendance date is required")
private LocalDate attendanceDate;

private LocalTime checkIn;

private LocalTime checkOut;

    @NotNull(message = "Attendance status is required")
private AttendanceStatus status;

private String remarks;

}
