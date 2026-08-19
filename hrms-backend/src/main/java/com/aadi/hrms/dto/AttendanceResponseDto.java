package com.aadi.hrms.dto;

import com.aadi.hrms.entity.AttendanceStatus;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDate;
import java.time.LocalTime;

@Data
@Builder
public class AttendanceResponseDto {

    private Long id;

    private Long employeeId;

    private String employeeName;

    private String employeeCode;

    private LocalDate attendanceDate;

    private LocalTime checkIn;

    private LocalTime checkOut;

    private AttendanceStatus status;

    private String remarks;
}

