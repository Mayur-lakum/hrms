package com.aadi.hrms.service.impl;

import com.aadi.hrms.dto.AttendanceRequestDto;
import com.aadi.hrms.dto.AttendanceResponseDto;
import com.aadi.hrms.entity.Attendance;
import com.aadi.hrms.entity.Employee;
import com.aadi.hrms.exception.ResourceNotFoundException;
import com.aadi.hrms.repository.AttendanceRepository;
import com.aadi.hrms.repository.EmployeeRepository;
import com.aadi.hrms.service.AttendanceService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AttendanceServiceImpl implements AttendanceService {

    private final AttendanceRepository attendanceRepository;
    private final EmployeeRepository employeeRepository;

    public AttendanceServiceImpl(
            AttendanceRepository attendanceRepository,
            EmployeeRepository employeeRepository) {

        this.attendanceRepository = attendanceRepository;
        this.employeeRepository = employeeRepository;
    }

    @Override
    public AttendanceResponseDto createAttendance(
            AttendanceRequestDto request) {

        Employee employee = employeeRepository
                .findById(request.getEmployeeId())
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Employee not found with id: "
                                        + request.getEmployeeId()));

        if (attendanceRepository
                .existsByEmployeeIdAndAttendanceDate(
                        request.getEmployeeId(),
                        request.getAttendanceDate())) {

            throw new IllegalArgumentException(
                    "Attendance already exists for this employee on "
                            + request.getAttendanceDate());
        }

        Attendance attendance = Attendance.builder()
                .employee(employee)
                .attendanceDate(request.getAttendanceDate())
                .checkIn(request.getCheckIn())
                .checkOut(request.getCheckOut())
                .status(request.getStatus())
                .remarks(request.getRemarks())
                .build();

        Attendance savedAttendance =
                attendanceRepository.save(attendance);

        return mapToResponse(savedAttendance);
    }

    @Override
    public AttendanceResponseDto getAttendanceById(Long id) {

        Attendance attendance = attendanceRepository
                .findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Attendance not found with id: " + id));

        return mapToResponse(attendance);
    }

    @Override
    public List<AttendanceResponseDto> getEmployeeAttendance(
            Long employeeId) {

        if (!employeeRepository.existsById(employeeId)) {
            throw new ResourceNotFoundException(
                    "Employee not found with id: " + employeeId);
        }

        return attendanceRepository
                .findByEmployeeId(employeeId)
                .stream()
                .map(this::mapToResponse)
                .toList();
    }

    @Override
    public AttendanceResponseDto updateAttendance(
            Long id,
            AttendanceRequestDto request) {

        Attendance attendance = attendanceRepository
                .findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Attendance not found with id: " + id));

        Employee employee = employeeRepository
                .findById(request.getEmployeeId())
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Employee not found with id: "
                                        + request.getEmployeeId()));

        if (!attendance.getEmployee().getId()
                .equals(request.getEmployeeId())
                || !attendance.getAttendanceDate()
                .equals(request.getAttendanceDate())) {

            if (attendanceRepository
                    .existsByEmployeeIdAndAttendanceDate(
                            request.getEmployeeId(),
                            request.getAttendanceDate())) {

                throw new IllegalArgumentException(
                        "Attendance already exists for this employee on "
                                + request.getAttendanceDate());
            }
        }

        attendance.setEmployee(employee);
        attendance.setAttendanceDate(
                request.getAttendanceDate());
        attendance.setCheckIn(request.getCheckIn());
        attendance.setCheckOut(request.getCheckOut());
        attendance.setStatus(request.getStatus());
        attendance.setRemarks(request.getRemarks());

        Attendance updatedAttendance =
                attendanceRepository.save(attendance);

        return mapToResponse(updatedAttendance);
    }

    private AttendanceResponseDto mapToResponse(
            Attendance attendance) {

        return AttendanceResponseDto.builder()
                .id(attendance.getId())
                .employeeId(
                        attendance.getEmployee().getId())
                .employeeName(
                        attendance.getEmployee().getFirstName()
                                + " "
                                + attendance.getEmployee().getLastName())
                .employeeCode(
                        attendance.getEmployee().getEmployeeCode())
                .attendanceDate(
                        attendance.getAttendanceDate())
                .checkIn(
                        attendance.getCheckIn())
                .checkOut(
                        attendance.getCheckOut())
                .status(
                        attendance.getStatus())
                .remarks(
                        attendance.getRemarks())
                .build();
    }
}
