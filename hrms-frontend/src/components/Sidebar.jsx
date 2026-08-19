import { NavLink } from 'react-router-dom';
import { useAuth } from '../context/useAuth';

function Sidebar() {
  const { role } = useAuth();

  return (
    <aside className="sidebar">
      <h3>Menu</h3>

      <nav className="sidebar-nav">
        <NavLink
          to="/dashboard"
          className="sidebar-link"
        >
          Dashboard
        </NavLink>

        {(role === 'ADMIN' || role === 'HR') && (
          <>
            <NavLink
              to="/employees"
              className="sidebar-link"
            >
              Employees
            </NavLink>

            <NavLink
              to="/attendance"
              className="sidebar-link"
            >
              Attendance
            </NavLink>

            <NavLink
              to="/leaves"
              className="sidebar-link"
            >
              Leaves
            </NavLink>
          </>
        )}

        {role === 'ADMIN' && (
          <>
            <NavLink
              to="/departments"
              className="sidebar-link"
            >
              Departments
            </NavLink>

            <NavLink
              to="/roles"
              className="sidebar-link"
            >
              Roles
            </NavLink>
          </>
        )}

        {role === 'EMPLOYEE' && (
          <>
            <NavLink
              to="/profile"
              className="sidebar-link"
            >
              My Profile
            </NavLink>

            <NavLink
              to="/my-attendance"
              className="sidebar-link"
            >
              My Attendance
            </NavLink>

            <NavLink
              to="/my-leaves"
              className="sidebar-link"
            >
              My Leaves
            </NavLink>
          </>
        )}
      </nav>
    </aside>
  );
}

export default Sidebar;