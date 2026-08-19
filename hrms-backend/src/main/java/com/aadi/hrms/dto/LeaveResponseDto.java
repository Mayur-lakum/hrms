package com.aadi.hrms.dto;


import com.aadi.hrms.entity.LeaveStatus;
import com.aadi.hrms.entity.LeaveType;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDate;

@Data
@Builder
public class LeaveResponseDto {

    private Long id;

    private Long employeeId;

    private String employeeName;

    private String employeeCode;

    private LeaveType leaveType;

    private LocalDate startDate;

    private LocalDate endDate;

    private String reason;

    private LeaveStatus status;

}
