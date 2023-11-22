import Axios from "axios";
import { Link } from "react-router-dom";

function EmployeeListRow(props) {
    const { _id, name, email, employeeId, department, position } = props.employeeObj;

    const handleClick = () => {
        Axios.delete(`https://project-backend-deployment.onrender.com/employeeRoute/delete-employee/${_id}`)
            .then((res) => {
                if (res.status === 200) {
                    alert("Record deleted successfully");
                    window.location.reload();
                } else Promise.reject();
            })
            .catch((err) => alert(err));
    };

    return (
        <tr>
            <td style={{ width: "20%", }}>{name}</td>
            <td style={{ width: "20%", }}>{email}</td>
            <td style={{ width: "20%", }}>{employeeId}</td>
            <td style={{ width: "20%",  }}>{department}</td>
            <td style={{ width: "20%", }}>{position}</td>
            <td style={{ width: "40%",  }}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
               <button className="btn btn-success mx-2">
               <Link to={`/edit-employee/${_id}`} className="text-decoration-none text-light">
               Edit
               </Link>
               </button>
               <button onClick={handleClick} className="btn btn-danger mx-2">
               Delete
               </button>
            </div>
            </td>
        </tr>
    );
}

export default EmployeeListRow;
