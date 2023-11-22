import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import EmployeeForm from "./EmployeeForm";
import Axios from "axios";

function EditEmployee() {
    const { id } = useParams();
    const [data, setData] = useState({ name: "", email: "", employeeId: "", department: "", position: "" });
    const [newData, setNewData] = useState([]);

    useEffect(() => {
        Axios.get("https://project-backend-deployment.onrender.com/employeeRoute/update-employee/" + id)
            .then((res) => {
                if (res.status === 200) {
                    const { name, email, employeeId, department, position } = res.data;
                    setData({ name, email, employeeId, department, position });
                } else {
                    Promise.reject();
                }
            })
            .catch((err) => alert(err));
    }, [id]);

    const getState = (childData) => {
        setNewData(childData);
    };

    const handleSubmit = () => {
        const newObj = {
            name: newData[0],
            email: newData[1],
            employeeId: newData[2],
            department: newData[3],
            position: newData[4],
            password: newData[5] 
        };

        Axios.put("https://project-backend-deployment.onrender.com/employeeRoute/update-employee/" + id, newObj)
            .then((res) => {
                if (res.status === 200) {
                    alert("Record updated successfully");
                } else {
                    Promise.reject();
                }
            })
            .catch((err) => alert(err));
    };
    const navigate = useNavigate();
    const handleLogout = () => {
        setTimeout(() => {
          navigate('/Home'); 
        }, 1500);
}

    return (
        <div style={{backgroundColor:"c5c6d0"}}>
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
            <form onSubmit={handleSubmit}>
                <EmployeeForm
                    getState={getState}
                    nameValue={data.name}
                    emailValue={data.email}
                    employeeIdValue={data.employeeId}
                    departmentValue={data.department}
                    positionValue={data.position}
                    passwordValue="" 
                >
                    Update Employee
                </EmployeeForm>
            </form>
        </div>
    );
}

export default EditEmployee;
