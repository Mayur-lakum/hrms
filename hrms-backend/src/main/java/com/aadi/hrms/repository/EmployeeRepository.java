package com.aadi.hrms.repository;

import com.aadi.hrms.entity.Employee;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface EmployeeRepository extends JpaRepository<Employee,Long> {
    boolean existsByEmployeeCode(String employeeCode);

    boolean existsByEmailIgnoreCase(String email);

    boolean existsByPhone(String phone);

    Optional<Employee> findByEmployeeCode(String employeeCode);

    Optional<Employee> findByEmailIgnoreCase(String email);

}
