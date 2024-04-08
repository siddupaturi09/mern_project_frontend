import Axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import EmployeeListRow from "./EmployeeListRow"; 

function EmployeeList() {
  const navigate = useNavigate();
  const handleLogout = () => {
    setTimeout(() => {
      navigate('/Home'); 
    }, 1500);
  };
    const [employeeArray, setEmployeeArray] = useState([]);

    useEffect(() => {
        Axios.get("https://project-backend-deployment.onrender.com/employeeRoute/")
            .then((res) => {
                if (res.status === 200) {
                    console.log(res.data);
                    setEmployeeArray(res.data);
                } else {
                    Promise.reject();
                }
            })
            .catch((err) => alert(err));
    }, []);

    const ListItems = () => {
        return employeeArray.map((employee, index) => {
            return <EmployeeListRow key={index} employeeObj={employee} />;
        });
    };

    return (
        <div style={{backgroundColor:"#c5c6d0",height:'300vh'}} >
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
      <div style={{ display: "flex", flexDirection:"column",justifyContent: "center", alignItems: "center", minHeight: "80vh" }} >
      <h2 class = "text-center" style={{fontFamily:'Calibri'}}><strong>List of Employees</strong></h2>
      <br/>
      <div class="table-responsive" id="emptable">
            <table className="mx-auto table table-light table-striped table-bordered ">
                <thead>
                    <tr >
                        <th className="text-center" style={{ width: "20%" }}>Name</th>
                        <th className="text-center" style={{ width: "20%" }}>Email</th>
                        <th className="text-center" style={{ width: "20%" }}>Employee ID</th>
                        <th className="text-center" style={{ width: "20%" }}>Department</th>
                        <th className="text-center" style={{ width: "20%" }}>Position</th>
                        <th className="text-center" style={{ width: "40%" }}>Action</th>
                    </tr>
                </thead>
                <tbody >
                    {ListItems()}
                </tbody>
            </table>
        </div>
      </div>
        </div>
    );
}

export default EmployeeList;
