import React, { useEffect } from 'react';
import { Link, Route, Routes, useNavigate } from 'react-router-dom';
import RecordTime from './RecordTime';
import AttendanceQueries from './AttendanceQueries';

function EmployeePanel() {
  const navigate = useNavigate();

  useEffect(() => {
    const storedInTime = localStorage.getItem('inTime');

    if (!storedInTime) {
      const loginTime = new Date();
      localStorage.setItem('inTime', loginTime.toISOString());
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('inTime');

    setTimeout(() => {
      navigate('/Home');
    }, 1500);
  };

  return (
    <div style={{ backgroundColor: '#c5c6d0', minHeight: '100vh' }} >
      <nav className="navbar navbar-expand-lg" id="emp-panel-navbar" >
        <div className="container">
          <Link className="navbar-brand" to="/">
            Employee Panel
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav me-auto">
              <li className="nav-item">
                <Link className="nav-link" to="/record-time" id="rte">
                  Record Time Entries
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/attendance-queries" id="aq">
                  Attendance Queries
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/Home" onClick={handleLogout} id="logout">
                  Logout
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <div id="emp-panel">
        <br/><br/>
        <h1 class="text-center"><strong>General Instructions for the Employees</strong></h1>
        <br/><br/>
        <ul>
          <li><h4>Kindly,make use of the Record Time Entries option as soon as you log in to mark your In Time.</h4></li>
          <li><h4>Click on the Out Time check-box in the Record Time Entries section to mark the Out Time.</h4></li>
          <li><h4>Do not forget to logout after your work time ends. </h4></li>
          <li><h4>In case of any queries, make use of the Attendance Queries option and reach out to us. </h4></li>
        </ul>
      </div>

      <div className="container">
        <Routes>
          <Route path="/record-time" element={<RecordTime />} />
          <Route path="/attendance-queries" element={<AttendanceQueries />} />
        </Routes>
      </div>
    </div>
  );
}

export default EmployeePanel;
