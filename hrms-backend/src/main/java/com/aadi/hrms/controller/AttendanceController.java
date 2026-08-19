package com.aadi.hrms.controller;


import com.aadi.hrms.dto.AttendanceRequestDto;
import com.aadi.hrms.dto.AttendanceResponseDto;
import com.aadi.hrms.service.AttendanceService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/attendance")
public class AttendanceController {

    private final AttendanceService attendanceService;

    public AttendanceController(AttendanceService attendanceService) {
        this.attendanceService = attendanceService;
    }


    @PostMapping
    @PreAuthorize("hasAnyAuthority('ADMIN','HR')")
    public ResponseEntity<AttendanceResponseDto> createAttendance(
            @Valid @RequestBody AttendanceRequestDto request
    ) {

        return new ResponseEntity<>(attendanceService.createAttendance(request), HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<AttendanceResponseDto> getAttendanceById(
            @PathVariable Long id
    ) {
        return ResponseEntity.ok(attendanceService.getAttendanceById(id));
    }


    @GetMapping("/employee/{employeeId}")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<List<AttendanceResponseDto>>
    getEmployeeAttendance(@PathVariable Long employeeId) {

        return ResponseEntity.ok(
                attendanceService.getEmployeeAttendance(employeeId)
        );
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasAnyAuthority('ADMIN', 'HR')")
    public ResponseEntity<AttendanceResponseDto> updateAttendance(
            @PathVariable Long id,
            @Valid @RequestBody AttendanceRequestDto request) {

        return ResponseEntity.ok(
                attendanceService.updateAttendance(id, request)
        );


    }
}



