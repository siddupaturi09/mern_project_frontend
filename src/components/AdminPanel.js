import React from 'react';
import { Link} from 'react-router-dom';
import {  Route, Routes } from 'react-router-dom';
import CreateEmployee from './CreateEmployee';
import EmployeeList from './EmployeeList';
import CheckAttendance from './CheckAttendance';
import { useNavigate } from 'react-router-dom';

function AdminPanel() {
  const navigate = useNavigate();
  const handleLogout = () => {
    setTimeout(() => {
      navigate('/Home'); 
    }, 1500);
  };
  return (
    <div id="adminpanel" >
      <nav className="navbar navbar-expand-lg" id="admin-panel-navbar">
        <div className="container" >
          <Link className="navbar-brand" to="/">Admin Panel</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav me-auto">
              <li id="ce" className="nav-item">
                <Link className="nav-link" to="/create-employee">Create Employee</Link>
              </li>
              <li id="el" className="nav-item">
                <Link className="nav-link" to="/employee-list">Employee List</Link>
              </li>
              <li id="ca" className="nav-item">
                <Link className="nav-link" to="/check-attendance">Check Attendance</Link>
              </li>
              <li id="log" className="nav-item">
                <Link className="nav-link" to="/Home" onClick={handleLogout}>Logout</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <Routes>
        <Route path="/create-employee" element={<CreateEmployee />} />
        <Route path="/employee-list" element={<EmployeeList />} />
        <Route path="/check-attendance" element={<CheckAttendance />} />
      </Routes>


    </div>
  );
}


export default AdminPanel;