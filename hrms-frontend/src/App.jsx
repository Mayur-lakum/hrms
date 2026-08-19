import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import ProtectedRoute from './routes/ProtectedRoute';
import Layout from './components/Layout';
import PlaceholderPage from './pages/PlaceholderPage';
import Employees from './pages/Employees';
import EmployeeDetails from './pages/EmployeeDetails';
import CreateEmployee from './pages/CreateEmployee';
import EditEmployee from './pages/EditEmployee';
import Departments from './pages/Departments';
import DepartmentDetails from './pages/DepartmentDetails';
import CreateDepartment from './pages/CreateDepartment';
import EditDepartment from './pages/EditDepartment';
import Attendance from './pages/Attendance';
import CreateAttendance from './pages/CreateAttendance';
import AttendanceDetails from './pages/AttendanceDetails';
import EditAttendance from './pages/EditAttendance';
import ApplyLeave from './pages/ApplyLeave';
import Leaves  from './pages/Leaves';
import LeaveDetails from './pages/LeaveDetails';
import Roles from './pages/Roles';
import Profile from './pages/Profile';
import MyAttendance from './pages/MyAttendance';
import MyLeaves from './pages/MyLeaves';







function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={<Navigate to="/login" replace />}
      />

      <Route
        path="/login"
        element={<Login />}
      />

      <Route element={<ProtectedRoute />}>
        <Route element={<Layout />}>

          <Route
            path="/dashboard"
            element={<Dashboard />}
          />

         <Route
  path="/employees"
  element={<Employees />}
/>


<Route
  path="/employees/create"
  element={<CreateEmployee />}
/>
<Route
  path="/employees/:id/edit"
  element={<EditEmployee />}
/>
<Route
  path="/leaves/:id"
  element={<LeaveDetails />}
/>
<Route
  path="/departments"
  element={<Departments />}
/>
<Route
  path="/departments/:id"
  element={<DepartmentDetails />}
/>
<Route
  path="/departments/create"
  element={<CreateDepartment />}
/>
<Route
  path="/departments/:id/edit"
  element={<EditDepartment />}
/>

<Route
  path="/attendance"
  element={<Attendance />}
/>

<Route
  path="/attendance/create"
  element={<CreateAttendance />}
/>

<Route
  path="/attendance/:id"
  element={<AttendanceDetails />}
/>


<Route
  path="/attendance/:id/edit"
  element={<EditAttendance />}
/>

<Route
  path="/leaves/apply"
  element={<ApplyLeave />}
/>

<Route
  path="/leaves"
  element={<Leaves />}
/>

<Route
  path="/roles"
  element={<Roles />}
/>

<Route 
path='/employees/:id'
element={<EmployeeDetails/>}
/>

        
         <Route
  path="/profile"
  element={<Profile />}
/>

         <Route
  path="/my-attendance"
  element={<MyAttendance />}
/>

         <Route
  path="/my-leaves"
  element={<MyLeaves />}
/>


          
          
        </Route>

      </Route>
      
    </Routes>
  );
}

export default App;

