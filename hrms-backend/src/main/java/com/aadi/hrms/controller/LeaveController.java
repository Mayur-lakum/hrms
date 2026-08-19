package com.aadi.hrms.controller;


import com.aadi.hrms.dto.LeaveRequestDto;
import com.aadi.hrms.dto.LeaveResponseDto;
import com.aadi.hrms.service.LeaveService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.swing.plaf.PanelUI;
import java.util.List;

@RestController
@RequestMapping("/api/leaves")
public class LeaveController {

    private final LeaveService leaveService;


    public LeaveController(LeaveService leaveService) {
        this.leaveService = leaveService;
    }



    @PostMapping
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<LeaveResponseDto>applyLeave(@Valid  @RequestBody LeaveRequestDto request){
   return new ResponseEntity<>(leaveService.applyLeave(request), HttpStatus.CREATED);

    }


    @GetMapping
    @PreAuthorize("hasAnyAuthority('ADMIN','HR')")
    public ResponseEntity<List<LeaveResponseDto>>getAllLeaves(){
        return ResponseEntity.ok(leaveService.getAllLeaves());

    }


    @GetMapping("/{id}")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<LeaveResponseDto>getLeaveById(@PathVariable Long id){
        return ResponseEntity.ok(leaveService.getLeaveById(id));
    }

    @GetMapping("/employee/{employeeId}")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<List<LeaveResponseDto>>getEmployeeLeaves(@PathVariable Long employeeId) {
        return ResponseEntity.ok(leaveService.getEmployeeLeaves(employeeId));

    }


@PutMapping("{id}/status")
@PreAuthorize("hasAnyAuthority('ADMIN','HR')")
public ResponseEntity<LeaveResponseDto>updateLeaveStatus(@RequestParam String status,@PathVariable Long id){
return ResponseEntity.ok(leaveService.updateLeaveStatus(id, status)
);

    }
}
