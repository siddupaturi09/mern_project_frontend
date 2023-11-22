import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function EmployeeForm(props) {
    const [name, setName] = useState(props.nameValue);
    const [email, setEmail] = useState(props.emailValue);
    const [employeeId, setEmployeeId] = useState(props.employeeIdValue);
    const [department, setDepartment] = useState(props.departmentValue);
    const [position, setPosition] = useState(props.positionValue);
    const [password, setPassword] = useState(props.passwordValue);

    useEffect(() => {
        setName(props.nameValue);
        setEmail(props.emailValue);
        setEmployeeId(props.employeeIdValue);
        setDepartment(props.departmentValue);
        setPosition(props.positionValue);
        setPassword(props.passwordValue);
    }, [props.nameValue, props.emailValue, props.employeeIdValue, props.departmentValue, props.positionValue, props.passwordValue]);

    const arr = [name, email, employeeId, department, position, password];

    const handleClick = () => {
        props.getState(arr);
    };

    return (
        <div style={{display: "flex",flexDirection:"column", justifyContent: "center", alignItems: "center", minHeight: "100vh",width:'100%',backgroundColor:"#c5c6d0"}}>
            <h1 style={{fontFamily:"Calibri"}} class="text-center"><strong>Employee Form</strong></h1>
            <br/>
             <div style={{padding: "20px", border: "1px solid #ccc", borderRadius: "8px", backgroundColor: "#f8f9fa" }} class="col-lg-6 col-md-12 col-sm-4">
            <input
                value={name}
                onChange={(event) => setName(event.target.value)}
                className="form-control my-3"
                placeholder="Enter employee's name"
            />
            <input
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                className="form-control my-3"
                placeholder="Enter employee's email"
            />
            <input
                value={employeeId}
                onChange={(event) => setEmployeeId(event.target.value)}
                className="form-control my-3"
                placeholder="Enter employee's ID"
            />
            <input
                value={department}
                onChange={(event) => setDepartment(event.target.value)}
                className="form-control my-3"
                placeholder="Enter employee's department"
            />
            <input
                value={position}
                onChange={(event) => setPosition(event.target.value)}
                className="form-control my-3"
                placeholder="Enter employee's position"
            />
            <input
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                type="password"
                className="form-control my-3"
                placeholder="Enter employee's password"
            />
            <br/>
            <button
                onClick={handleClick}
                className="btn d-block mx-auto my-3"
                type="submit"
                style={{backgroundColor:"black",color:"white",padding: '10px',fontSize: '16px',cursor: 'pointer',border: 'none',borderRadius: '5px',marginTop: '20px',}}
            >
                {props.children}
            </button>

        </div>
        </div>
    );
}

export default EmployeeForm;
