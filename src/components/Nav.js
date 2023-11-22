import { Link } from "react-router-dom";
import Employe from "./Employe";
import Admin from "./Admin";
import "bootstrap/dist/js/bootstrap.bundle.min";

function Nav() {
  return (
    <nav className="navbar" style={{ backgroundColor: "#000000" }}>
      <Link to="/" className="navbar-brand"  style={{ marginLeft: "18px", fontSize:"20px", color:"white" }}>
        TIMELY
      </Link>
      <div className="nav">
        <Link to="/Home" className="nav-link" style={linkStyle}>
          HOME
        </Link>

        <div className="dropdown">
          <button
            className="nav-link dropdown-toggle btn"
            type="button"
            id="dropdownMenuButton"
            data-bs-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
            style={linkStyle}
          >
            LOGIN
          </button>
          <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
            <Link to="/Employe" className="dropdown-item">
              Employee
            </Link>
            <Link to="/Admin" className="dropdown-item">
              Admin
            </Link>
          </div>
        </div>

        <Link to="/Aboutus" className="nav-link" style={linkStyle}>
          ABOUT US
        </Link>
        <Link to="/Contactus" className="nav-link" style={linkStyle}>
          CONTACT US
        </Link>
      </div>
    </nav>
  );
}

const linkStyle = {
  color: "white",
  padding: "8px 16px",
  fontSize:"17px",
};

export default Nav;
