import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import EmployeePanel from './EmployeePanel';

function Employe() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('https://project-backend-deployment.onrender.com/employeeRoute/employeeLoginVerification', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        setIsLoggedIn(true);
      } else {
        alert('Invalid email or password. Please try again.');
      }
    } catch (error) {
      alert('An error occurred. Please try again.');
      console.error('Error:', error);
    }
  };

  return (
    <div class="login-container">
      {isLoggedIn ? (
        <EmployeePanel />
      ) : (
        <>
          <div class="overlay1"></div>
          <div class="frm">
          <br/>
            <h1 className="text-center">Employee Login</h1>
            <br /><br />
            <form onSubmit={handleLogin}>
              <div className="form-group" style={{ display: 'flex', flexDirection: 'row', marginBottom: '15px' }}>
                <label className="form-control form-label font-weight-bold" style={{ width: '30%', marginRight: '10px', marginBottom: 0 }} htmlFor="email">
                  Email
                </label>
                <input
                  id="email"
                  className="form-control form-input"
                  style={{ width: '70%' }}
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className="form-group" style={{ display: 'flex', flexDirection: 'row', marginBottom: '15px' }}>
                <label className="form-control form-label font-weight-bold" style={{ width: '30%', marginRight: '10px', marginBottom: 0 }} htmlFor="password">
                  Password
                </label>
                <input
                  id="password"
                  className="form-control form-input"
                  style={{ width: '70%' }}
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <br />
              <div style={{ textAlign: 'center' }}>
                <button type="submit" className="btn " style={{backgroundColor:'black',color:'white',width:'20%'}}>
                  LOG IN
                </button>
              </div>
            </form>
          </div>
        </>
      )}
    </div>
  );
}

export default Employe;
