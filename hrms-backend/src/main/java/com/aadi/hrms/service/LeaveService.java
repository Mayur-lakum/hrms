package com.aadi.hrms.service;

import com.aadi.hrms.dto.LeaveRequestDto;
import com.aadi.hrms.dto.LeaveResponseDto;

import java.util.List;

public interface LeaveService {

    LeaveResponseDto applyLeave(LeaveRequestDto request);

    LeaveResponseDto getLeaveById(Long id);

    List<LeaveResponseDto> getEmployeeLeaves(Long employeeId);

    List<LeaveResponseDto> getAllLeaves();

    LeaveResponseDto updateLeaveStatus(Long id,String status);
}
