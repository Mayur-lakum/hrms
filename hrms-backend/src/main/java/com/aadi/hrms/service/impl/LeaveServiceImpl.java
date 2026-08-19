package com.aadi.hrms.service.impl;

import com.aadi.hrms.dto.LeaveRequestDto;
import com.aadi.hrms.dto.LeaveResponseDto;
import com.aadi.hrms.entity.Employee;
import com.aadi.hrms.entity.LeaveRequest;
import com.aadi.hrms.entity.LeaveStatus;
import com.aadi.hrms.exception.ResourceNotFoundException;
import com.aadi.hrms.repository.EmployeeRepository;
import com.aadi.hrms.repository.LeaveRequestRepository;
import com.aadi.hrms.service.LeaveService;
import org.springframework.stereotype.Service;


import java.util.List;

@Service
public class LeaveServiceImpl implements LeaveService {

    private final LeaveRequestRepository leaveRequestRepository;
    private final EmployeeRepository employeeRepository;

    public LeaveServiceImpl(LeaveRequestRepository leaveRequestRepository, EmployeeRepository employeeRepository) {

        this.leaveRequestRepository = leaveRequestRepository;
        this.employeeRepository = employeeRepository;
    }



    @Override
    public LeaveResponseDto applyLeave(LeaveRequestDto request) {
        Employee employee=employeeRepository.findById(request.getEmployeeId())
                .orElseThrow(()-> new ResourceNotFoundException("Employee not found with id:"+request.getEmployeeId()));

        if(request.getEndDate().isBefore(request.getStartDate())){
            throw new IllegalArgumentException("End date canot be before start date!");
        }

        LeaveRequest leaveRequest=LeaveRequest.builder()
                .employee(employee)
                .leaveType(request.getLeaveType())
                .startDate(request.getStartDate())
                .endDate(request.getEndDate())
                .reason(request.getReason())
                .status(LeaveStatus.PENDING)
                .build();
        LeaveRequest savedLeave=leaveRequestRepository.save(leaveRequest);

        return mapToResponse(savedLeave);
    }

    @Override
    public LeaveResponseDto getLeaveById(Long id) {
        LeaveRequest leaveRequest=leaveRequestRepository.findById(id)
                .orElseThrow(()->new ResourceNotFoundException("Leave request not found with id: "
                        + id));
        return mapToResponse(leaveRequest);
    }

    @Override
    public List<LeaveResponseDto> getEmployeeLeaves(Long employeeId) {
        if(!employeeRepository.existsById(employeeId)){
            throw new ResourceNotFoundException("Employee not dound with id:"+employeeId);
        }
        return leaveRequestRepository
                .findAll()
                .stream().
                filter(leave->leave
                        .getEmployee()
                        .getId()
                        .equals(employeeId))
                        .map(this::mapToResponse)
                .toList();
    }

    @Override
    public List<LeaveResponseDto> getAllLeaves() {
        return leaveRequestRepository.findAll()
                .stream()
                .map(this::mapToResponse)
                .toList();
    }




    @Override
    public LeaveResponseDto updateLeaveStatus(Long id, String status) {

        LeaveRequest leaveRequest =
                leaveRequestRepository.findById(id)
                        .orElseThrow(() ->
                                new ResourceNotFoundException(
                                        "Leave request not found with id: "
                                                + id));

        LeaveStatus newStatus;

        try {
            newStatus = LeaveStatus.valueOf(
                    status.toUpperCase());
        } catch (IllegalArgumentException ex) {
            throw new IllegalArgumentException(
                    "Invalid leave status. Use APPROVED or REJECTED");
        }

        if (newStatus == LeaveStatus.PENDING) {
            throw new IllegalArgumentException(
                    "Leave status can only be APPROVED or REJECTED");
        }

        leaveRequest.setStatus(newStatus);

        LeaveRequest updatedLeave =
                leaveRequestRepository.save(leaveRequest);

        return mapToResponse(updatedLeave);
    }





    private LeaveResponseDto mapToResponse(LeaveRequest leaveRequest) {

        return LeaveResponseDto.builder()
                .id(leaveRequest.getId())
                .employeeId(
                        leaveRequest.getEmployee().getId())
                .employeeName(
                        leaveRequest.getEmployee().getFirstName()
                                + " "
                                + leaveRequest.getEmployee().getLastName())
                .employeeCode(
                        leaveRequest.getEmployee().getEmployeeCode())
                .leaveType(
                        leaveRequest.getLeaveType())
                .startDate(
                        leaveRequest.getStartDate())
                .endDate(
                        leaveRequest.getEndDate())
                .reason(
                        leaveRequest.getReason())
                .status(
                        leaveRequest.getStatus())
                .build();
    }
}
