package com.aadi.hrms.service.impl;

import com.aadi.hrms.dto.EmployeeRequestDto;
import com.aadi.hrms.dto.EmployeeResponseDto;
import com.aadi.hrms.entity.Department;
import com.aadi.hrms.entity.Employee;
import com.aadi.hrms.entity.EmployeeStatus;
import com.aadi.hrms.entity.User;
import com.aadi.hrms.exception.ResourceNotFoundException;
import com.aadi.hrms.repository.DepartmentRepository;
import com.aadi.hrms.repository.EmployeeRepository;
import com.aadi.hrms.repository.UserRepository;
import com.aadi.hrms.service.EmployeeService;
import org.springframework.stereotype.Service;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import java.util.List;

@Service
public class EmployeeServiceImpl implements EmployeeService {

    private final EmployeeRepository employeeRepository;
    private final DepartmentRepository departmentRepository;
    private final UserRepository userRepository;

    public EmployeeServiceImpl(
            EmployeeRepository employeeRepository,
            DepartmentRepository departmentRepository,
            UserRepository userRepository) {

        this.employeeRepository = employeeRepository;
        this.departmentRepository = departmentRepository;
        this.userRepository = userRepository;
    }

    @Override
    public EmployeeResponseDto createEmployee(EmployeeRequestDto request) {

        // 1. Check duplicate employee code
        if (employeeRepository.existsByEmployeeCode(request.getEmployeeCode())) {
            throw new IllegalArgumentException(
                    "Employee code already exists: " + request.getEmployeeCode());
        }





        if (request.getPhone() != null &&
                employeeRepository.existsByPhone(request.getPhone())) {

            throw new IllegalArgumentException(
                    "Employee phone already exists: " + request.getPhone());
        }


        Department department = departmentRepository.findById(request.getDepartmentId())
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Department not found with id: "
                                        + request.getDepartmentId()));


        User user = userRepository.findById(request.getUserId())
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "User not found with id: "
                                        + request.getUserId()));

        if (employeeRepository.existsByEmailIgnoreCase(user.getEmail())) {
            throw new IllegalArgumentException(
                    "An employee already exists for email: "
                            + user.getEmail());
        }

        // 6. Find Manager if provided
        Employee manager = null;

        if (request.getManagerId() != null) {
            manager = employeeRepository.findById(request.getManagerId())
                    .orElseThrow(() ->
                            new ResourceNotFoundException(
                                    "Manager not found with id: "
                                            + request.getManagerId()));
        }


        Employee employee = Employee.builder()
                .employeeCode(request.getEmployeeCode())
                .firstName(request.getFirstName())
                .lastName(request.getLastName())
                .email(user.getEmail())
                .phone(request.getPhone())
                .gender(request.getGender())
                .dateOfBirth(request.getDateOfBirth())
                .joiningDate(request.getJoiningDate())
                .designation(request.getDesignation())
                .salary(request.getSalary())
                .department(department)
                .manager(manager)
                .status(request.getStatus() != null
                        ? request.getStatus()
                        : EmployeeStatus.ACTIVE)
                .profileImage(request.getProfileImage())
                .user(user)
                .build();

        Employee savedEmployee = employeeRepository.save(employee);

        // 8. Entity -> Response DTO
        return mapToResponse(savedEmployee);
    }

    @Override
    public EmployeeResponseDto getEmployeeById(Long id) {

        Employee employee = employeeRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Employee not found with id: " + id));

        return mapToResponse(employee);
    }

    @Override
    public Page<EmployeeResponseDto> getAllEmployees(
            int page,
            int size,
            String sortBy,
            String sortDir) {

        Sort sort = sortDir.equalsIgnoreCase("desc")
                ? Sort.by(sortBy).descending()
                : Sort.by(sortBy).ascending();

        Pageable pageable = PageRequest.of(page, size, sort);

        return employeeRepository.findAll(pageable)
                .map(this::mapToResponse);
    }

//    @Override
//    public List<EmployeeResponseDto> getAllEmployees() {
//
//        return employeeRepository.findAll()
//                .stream()
//                .map(this::mapToResponse)
//                .toList();
//    }



    @Override
    public EmployeeResponseDto updateEmployee(
            Long id,
            EmployeeRequestDto request) {

        Employee employee = employeeRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Employee not found with id: " + id));

        if (!employee.getEmployeeCode().equalsIgnoreCase(request.getEmployeeCode())
                && employeeRepository.existsByEmployeeCode(request.getEmployeeCode())) {

            throw new IllegalArgumentException(
                    "Employee code already exists: "
                            + request.getEmployeeCode());
        }

        if (request.getPhone() != null
                && !request.getPhone().equals(employee.getPhone())
                && employeeRepository.existsByPhone(request.getPhone())) {

            throw new IllegalArgumentException(
                    "Employee phone already exists: "
                            + request.getPhone());
        }

        Department department = departmentRepository
                .findById(request.getDepartmentId())
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Department not found with id: "
                                        + request.getDepartmentId()));

        User user = userRepository.findById(request.getUserId())
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "User not found with id: "
                                        + request.getUserId()));

        if (!employee.getEmail().equalsIgnoreCase(user.getEmail())
                && employeeRepository.existsByEmailIgnoreCase(user.getEmail())) {

            throw new IllegalArgumentException(
                    "An employee already exists for email: "
                            + user.getEmail());
        }

        Employee manager = null;

        if (request.getManagerId() != null) {

            manager = employeeRepository.findById(request.getManagerId())
                    .orElseThrow(() ->
                            new ResourceNotFoundException(
                                    "Manager not found with id: "
                                            + request.getManagerId()));
        }

        employee.setEmployeeCode(request.getEmployeeCode());
        employee.setFirstName(request.getFirstName());
        employee.setLastName(request.getLastName());

        // Email comes from User
        employee.setEmail(user.getEmail());

        employee.setPhone(request.getPhone());
        employee.setGender(request.getGender());
        employee.setDateOfBirth(request.getDateOfBirth());
        employee.setJoiningDate(request.getJoiningDate());
        employee.setDesignation(request.getDesignation());
        employee.setSalary(request.getSalary());
        employee.setDepartment(department);
        employee.setManager(manager);

        employee.setStatus(
                request.getStatus() != null
                        ? request.getStatus()
                        : employee.getStatus());

        employee.setProfileImage(request.getProfileImage());
        employee.setUser(user);

        Employee updatedEmployee =
                employeeRepository.save(employee);

        return mapToResponse(updatedEmployee);
    }


    @Override
    public void deleteEmployee(Long id) {

        Employee employee = employeeRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Employee not found with id: " + id));

        employeeRepository.delete(employee);
    }

    @Override
    public EmployeeResponseDto getEmployeeByEmail(String email) {

        Employee employee = employeeRepository.findByEmailIgnoreCase(email)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Employee not found for email: " + email
                        ));

        return mapToResponse(employee);
    }




    private EmployeeResponseDto mapToResponse(Employee employee) {

        return EmployeeResponseDto.builder()
                .id(employee.getId())
                .employeeCode(employee.getEmployeeCode())
                .firstName(employee.getFirstName())
                .lastName(employee.getLastName())
                .email(employee.getEmail())
                .phone(employee.getPhone())
                .gender(employee.getGender())
                .dateOfBirth(employee.getDateOfBirth())
                .joiningDate(employee.getJoiningDate())
                .designation(employee.getDesignation())
                .salary(employee.getSalary())
                .departmentId(employee.getDepartment().getId())
                .departmentName(employee.getDepartment().getName())
                .managerId(
                        employee.getManager() != null
                                ? employee.getManager().getId()
                                : null)
                .managerName(
                        employee.getManager() != null
                                ? employee.getManager().getFirstName()
                                + " "
                                + employee.getManager().getLastName()
                                : null)
                .status(employee.getStatus())
                .profileImage(employee.getProfileImage())
                .userId(employee.getUser().getId())
                .build();
    }
}

