package com.aadi.hrms.dto;

import jakarta.validation.constraints.*;
import lombok.Data;

@Data
public class UserRequestDto {

    @NotBlank(message = "First name is required")
    @Size(min = 2,max=50)
    private String firstName;

    @NotBlank(message = "Last name is required")
    @Size(min = 2,max=50)
    private String lastName;

    @Email(message = "Invalid email format")
    @NotBlank(message = "Email is required")
    private String email;

    @NotBlank(message = "Password is required")
    @Size(min=8,message ="Passowrd must contain atleast 8 characters." )
    private String password;

    @NotBlank(message = "Phone number is required")
    @Pattern(
            regexp = "^[0-9]{10}$",
            message = "Phone number must contain exactly 10 digits"
    )
    private String phone;

    @NotNull(message = "Role is required")
    private Long roleId;
}
