import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import EmployeeForm from "./EmployeeForm";
import Axios from "axios";

function CreateEmployee() {
    const formStyle = {
        display: "inline-flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh", 
        padding: "20px",
        width:'100%',
    };

    const [arr, setArr] = useState([]);

    const handleSubmit = (event) => {
        event.preventDefault();
        alert("Creating a record...");
        const data = {
            name: arr[0],
            email: arr[1],
            employeeId: arr[2],
            department: arr[3],
            position: arr[4],
            password: arr[5] 
        };

        Axios.post("https://project-backend-deployment.onrender.com/employeeRoute/create-employee", data)
            .then((res) => {
                if (res.status === 200) {
                    alert("Record added to DB");
                } else {
                    alert("res.status:" + res.status);
                    Promise.reject();
                }
            })
            .catch((err) => console.log(err));
    };

    const getState = (out) => {
        setArr(out);
    };

    const navigate = useNavigate();
    const handleLogout = () => {
        setTimeout(() => {
          navigate('/Home'); 
        }, 1500);
}

    return (
        <div style={{backgroundColor:"#c5c6d0"}}>
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
              <li id="ca" className="nav-item">
                <Link className="nav-link" to="/upload-materials">Upload Materials</Link>
              </li>
              <li id="log" className="nav-item">
                <Link className="nav-link" to="/Home" onClick={handleLogout}>Logout</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
        <form onSubmit={handleSubmit} style={formStyle}>
            <EmployeeForm
                getState={getState}
                nameValue=""
                emailValue=""
                employeeIdValue=""
                departmentValue=""
                positionValue=""
                passwordValue="" 
            >
                Create Employee
            </EmployeeForm>

        </form>
        </div>
    );
}

export default CreateEmployee;
