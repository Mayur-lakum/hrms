package com.aadi.hrms.service;

import com.aadi.hrms.dto.AttendanceRequestDto;
import com.aadi.hrms.dto.AttendanceResponseDto;

import java.util.List;

public interface AttendanceService {

    AttendanceResponseDto createAttendance(
            AttendanceRequestDto request);

    AttendanceResponseDto getAttendanceById(Long id);

    List<AttendanceResponseDto> getEmployeeAttendance(
            Long employeeId);

    AttendanceResponseDto updateAttendance(
            Long id,
            AttendanceRequestDto request);
}

