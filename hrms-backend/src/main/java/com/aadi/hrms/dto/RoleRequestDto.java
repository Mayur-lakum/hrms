package com.aadi.hrms.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;


@Data
public class RoleRequestDto {

    @NotBlank(message = "Role name is required")
    private String roleName;

}


