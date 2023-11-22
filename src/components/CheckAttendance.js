import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Link,useNavigate } from 'react-router-dom';


function CheckAttendance() {
  const navigate = useNavigate();
  const containerStyle = {
    textAlign: 'center',
    margin: '50px',
    border: '1px solid black',
    padding: '40px',
  };
  const labelStyle = {
    textAlign: 'center',  
    fontWeight: 'bold',
  };

  const tableStyle = {
    width: '80%',
    marginTop: '10px',
    borderCollapse: 'collapse',
    border: '2px solid black',
    margin:'auto', 
  };

  const cellStyle = {
    border: '2px solid black', 
    padding: '7px',
    textAlign: 'left',
  };

  const buttonStyle = {
    marginTop: '10px',
  };

  const [employeeIds, setEmployeeIds] = useState([]);
  const [selectedEmployeeId, setSelectedEmployeeId] = useState('');
  const [selectedDate, setSelectedDate] = useState(null);
  const [timeRecords, setTimeRecords] = useState([]);
  
  const handleLogout = () => {
    setTimeout(() => {
      navigate('/Home');
    }, 1500);}

  useEffect(() => {
    fetchEmployeeIds();
  }, []);

  useEffect(() => {
    if (selectedDate && selectedEmployeeId) {
      fetchTimeRecords(selectedDate, selectedEmployeeId);
    }
  }, [selectedDate, selectedEmployeeId]);

  const fetchEmployeeIds = async () => {
    try {
      const response = await fetch('https://project-backend-deployment.onrender.com/employeeRoute/employee-ids');
      const data = await response.json();
      setEmployeeIds(data);
    } catch (error) {
      console.error('Error fetching employeeIds:', error);
    }
  };

  const fetchTimeRecords = async (formattedDate, employeeId) => {
    try {
      const response = await fetch(
        `https://project-backend-deployment.onrender.com/timeTrackingRoute/get-time-by-employee/${employeeId}?date=${formattedDate}`
      );

      const data = await response.json();
      setTimeRecords(data.map(convertTimeRecords));
    } catch (error) {
      console.error('Error fetching time records:', error);
    }
  };

  const convertTimeRecords = (record) => {
    const date = new Date(record.date);
    const formattedDate = date.toISOString().split('T')[0];

    let inTime = 'Not Logged In';
    let outTime = 'On Leave';

    if (record.inTime) {
      const inTimeUtc = new Date(record.inTime);
      inTimeUtc.setHours(inTimeUtc.getHours()); 
      inTime = inTimeUtc.toLocaleTimeString('en-IN', { hour12: false });
    }

    if (record.outTime) {
      const outTimeUtc = new Date(record.outTime);
      outTimeUtc.setHours(outTimeUtc.getHours()); 
      outTime = outTimeUtc.toLocaleTimeString('en-IN', { hour12: false });
    }

    return {
      ...record,
      date: formattedDate,
      inTime,
      outTime,
    };
  };

  const handleEmployeeIdChange = (event) => {
    const selectedId = event.target.value;
    setSelectedEmployeeId(selectedId);
    setSelectedDate(null);
  };

  const handleDateChange = (date) => {
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    const formattedDate = `${year}-${month}-${day}`;

    setSelectedDate(date);
    fetchTimeRecords(formattedDate, selectedEmployeeId);
  };

  const calculateTotalTimeWorked = (timeRecords) => {
    let totalMilliseconds = 0;

    timeRecords.forEach((record) => {
      if (record.inTime && record.outTime) {
        const inTime = new Date(`${record.date}T${record.inTime}Z`).getTime();
        const outTime = new Date(`${record.date}T${record.outTime}Z`).getTime();

        if (!isNaN(inTime) && !isNaN(outTime)) {
          const timeDifference = outTime - inTime;
          totalMilliseconds += timeDifference;
        }
      }
    });

    const totalSeconds = Math.floor(totalMilliseconds / 1000);
    const totalHours = Math.floor(totalSeconds / 3600);
    const totalMinutes = Math.floor((totalSeconds % 3600) / 60);
    const remainingSeconds = totalSeconds % 60;

    return `${totalHours} hours, ${totalMinutes} minutes, and ${remainingSeconds} seconds`;
  };

  return (
    <div style={{backgroundColor:"#c5c6d0",minHeight:'120vh'}}>
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
  <div>
    <div style={containerStyle}>
      <h2>Check Attendance</h2>
      <br></br>
      <label style={labelStyle} htmlFor="employeeId">Select Employee ID:</label>
      <select id="employeeId" value={selectedEmployeeId} onChange={handleEmployeeIdChange}>
        <option value="" disabled>
          Select an Employee ID
        </option>
        {employeeIds.map((employeeId) => (
          <option key={employeeId._id} value={employeeId.employeeId}>
            {employeeId.employeeId}
          </option>
        ))}
      </select>
      <br></br><br/>
      {selectedEmployeeId && (
        <div>
          <label style={labelStyle} htmlFor="datepicker">Select Date:</label>
          <DatePicker
            id="datepicker"
            selected={selectedDate}
            onChange={handleDateChange}
            dateFormat="dd-MM-yyyy"
          />
          <br></br>
          {selectedDate && (
            <div>
              <br/>
              <h3>
                Time Records for Employee ID: {selectedEmployeeId} on{' '}
                {selectedDate.toLocaleDateString('en-IN')}
              </h3>
              <p>Total Time Worked: {calculateTotalTimeWorked(timeRecords)}</p>

              <br/>
              {timeRecords.length > 0 ? (
                <table style={tableStyle}>
                  <thead>
                    <tr>
                      <th style={cellStyle}>Date</th>
                      <th style={cellStyle}>In Time</th>
                      <th style={cellStyle}>Out Time</th>
                    </tr>
                  </thead>
                  <tbody>
                    {timeRecords.map((record) => (
                      <tr key={record._id}>
                        <td style={cellStyle}>{record.date}</td>
                        <td style={cellStyle}>{record.inTime}</td>
                        <td style={cellStyle}>{record.outTime}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <p>No time records found for the selected employee on the selected date.</p>
              )}
              <br/><br/>
              
            </div>
          )}
        </div>
      )}
    </div>
    <br/>
    </div>
  </div>
    
  );
}

export default CheckAttendance;
