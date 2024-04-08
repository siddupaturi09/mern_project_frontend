import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

function AttendanceQueries() {
    const navigate = useNavigate();
    const containerStyle = {
      backgroundColor:'#c5c6d0',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100vh',
      textAlign:'center', 
  };
  const textStyle = {
    backgroundColor:'#f8f9fa',
    border: '1px solid #ccc',
    padding: '20px', 
    borderRadius: '8px',
    width:'70%',
    fontFamily:'Calibri',
    fontWeight:'700px',
  }
  const handleLogout = () => {
    localStorage.removeItem('inTime');

    setTimeout(() => {
      navigate('/Home');
    }, 1500);
  };

  const handleSendAttendanceQuery = () => {
    window.location.href = 'mailto:admin@example.com';
  };

  return (
    <div>
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
          <Link className="nav-link" to="/download-materials" id="aq">
            Download Materials
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
<div style={containerStyle}>
  <div style={textStyle}>
  <br/><br/>
  <h1 class="text-center"><strong>Attendance Queries</strong></h1>
      <h3 class="text-center"><strong>Use this page to send attendance queries to the Admin.</strong></h3>
      <br/>
      <button style={{backgroundColor:'black',color:'white', border: 'none', borderRadius: '5px',marginTop: '20px', padding: '10px',fontSize: '16px', cursor: 'pointer',alignSelf:'center',}} onClick={handleSendAttendanceQuery}>Send Attendance Query</button>
      <br/><br/>
  </div>
    </div>
    </div>
  );
}

export default AttendanceQueries;
