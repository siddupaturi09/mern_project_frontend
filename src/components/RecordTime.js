import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh',
    fontFamily: 'Calibri',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    maxWidth: '600px',
    width: '100%',
    backgroundColor: '#f8f9fa',
    padding: '20px',
    borderRadius: '18px',
  },
  inputContainer: {
    display: 'flex',
    alignItems: 'center',
    margin: '10px 0',
  },
  label: {
    minWidth: '100px',
    marginRight: '10px',
  },
  input: {
    flex: 1,
  },
  checkboxLabel: {
    marginLeft: '10px',
    display: 'flex',
    alignItems: 'center',
  },
  button: {
    padding: '10px',
    fontSize: '16px',
    cursor: 'pointer',
    backgroundColor: 'black',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    marginTop: '20px',
    width:'20%',
  },
  
  recordedTime: {
    fontSize: '18px',
    margin: '20px 0',
  },
};

function RecordTime() {
  const navigate = useNavigate();
  const [employeeID, setEmployeeID] = useState('');
  const [inTime, setInTime] = useState(() => {
    const storedInTime = localStorage.getItem('inTime');
    return storedInTime ? new Date(storedInTime) : new Date();
  });
  const [outTime, setOutTime] = useState(null);
  const [isOutTimeChecked, setIsOutTimeChecked] = useState(false);
  const [recordedTime, setRecordedTime] = useState('');

  useEffect(() => {
    localStorage.setItem('inTime', inTime.toISOString());
  }, [inTime]);

  const handleRecordTime = () => {
    const todayDate = new Date().toISOString().split('T')[0];

    const data = {
      employeeID: employeeID !== '' ? Number(employeeID) : '',
      inTime: inTime.toISOString(),
      outTime: isOutTimeChecked && outTime ? outTime.toISOString() : '',
      date: todayDate,
    };

    fetch('https://project-backend-deployment.onrender.com/timeTrackingRoute/recordTimeEntries', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then(responseData => {
        console.log('Recorded successfully:', responseData);
      })
      .catch(error => {
        console.error('Error occurred:', error);
      });

    let totalWorkedTime = '';
    if (isOutTimeChecked && outTime) {
      const diffMilliseconds = outTime.getTime() - inTime.getTime();

      const hours = Math.floor(diffMilliseconds / (1000 * 60 * 60));
      const minutes = Math.floor((diffMilliseconds % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diffMilliseconds % (1000 * 60)) / 1000);

      totalWorkedTime = `${hours} hours ${minutes} minutes ${seconds} seconds`;
    }

    const outTimeFormatted = outTime ? formatTime(outTime) : '';

    setRecordedTime(
      `Employee ID: ${employeeID}, Recorded time - In: ${formatTime(inTime)}, Out: ${outTimeFormatted}, Total Worked Time: ${totalWorkedTime}`
    );

    setInTime(new Date());
    localStorage.setItem('inTime', new Date().toISOString());
    setTimeout(() => {
      navigate('/employee-panel/*');
    }, 1600);
  };

  const handleOutTimeCheckbox = () => {
    if (!isOutTimeChecked) {
      setOutTime(new Date());
    } else {
      setOutTime(null);
    }
    setIsOutTimeChecked(!isOutTimeChecked);
  };

  const formatTime = (date) => {
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();

    const ampm = hours >= 12 ? 'PM' : 'AM';
    const formattedHours = hours % 12 === 0 ? 12 : hours % 12;

    return `${pad(formattedHours)}:${pad(minutes)}:${pad(seconds)} ${ampm}`;
  };

  const pad = (number) => {
    return number < 10 ? `0${number}` : number;
  };
  const handleLogout = () => {
    localStorage.removeItem('inTime');
    setTimeout(() => {
      navigate('/Home');
    }, 1500);
  };

  return (
    <div style={{backgroundColor:'#c5c6d0'}}>
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
    <div style={styles.container}>
      <h1><strong>Employee Time Tracking</strong></h1>
      <br/>
      <form style={styles.form}>
        <div style={styles.inputContainer}>
          <label style={styles.label}><h5>Employee ID:</h5></label>
          <input
            type="text"
            value={employeeID}
            onChange={(e) => setEmployeeID(e.target.value)}
            style={styles.input}
          />
        </div>

        <div style={styles.inputContainer}>
          <label style={styles.label}><h5>In Time:</h5></label>
          <input type="text" value={formatTime(inTime)} readOnly style={styles.input} />
        </div>

        <div style={styles.inputContainer}>
          <label style={styles.label}><h5>Out Time:</h5></label>
          <input
            type="text"
            value={isOutTimeChecked && outTime ? formatTime(outTime) : ''}
            readOnly
            style={styles.input}
          />
          <label style={styles.checkboxLabel}>
            <input type="checkbox" checked={isOutTimeChecked} onChange={handleOutTimeCheckbox} />
            Out Time
          </label>
        </div>

        <button type="button" style={styles.button} onClick={handleRecordTime}>
          Record Time
        </button>

      </form>

      {recordedTime && <p style={styles.recordedTime}>{recordedTime}</p>}
    </div>
    </div>
  );
}

export default RecordTime;
