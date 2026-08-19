package com.aadi.hrms.dto;


import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class DepartmentResponseDto {

    private Long id;

    private String name;

    private String description;

    private Boolean active;


}
