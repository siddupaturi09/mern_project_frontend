import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import './App.css';
import { HashRouter,Routes,Route } from 'react-router-dom';
import Bg from './components/Bg.jpg';

import Home from './components/Home';
import Employe from "./components/Employe";
import Admin from "./components/Admin";
import Aboutus from './components/Aboutus';
import Nav from './components/Nav';
import Contactus from './components/Contactus';
import CreateEmployee from './components/CreateEmployee';
import EmployeeList from './components/EmployeeList';
import CheckAttendance from './components/CheckAttendance';
import EmployeeListRow from './components/EmployeeListRow';
import EditEmployee from './components/EditEmployee';
import EmployeePanel from './components/EmployeePanel';
import AdminPanel from './components/AdminPanel';
import RecordTime from './components/RecordTime';
import AttendanceQueries from './components/AttendanceQueries';



function App() {
  return (
     <div>
      <HashRouter>
      <Nav/>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/Home" element={<Home/>}/>
        <Route path="/Employe/*" element={<Employe/>}/>
        <Route path="/Admin/*" element={<Admin/>}/>        
        <Route path="/AdminPanel/*" element={<AdminPanel/>}/>
        <Route path="/employee-panel/*" element={<EmployeePanel/>}/>
        <Route path="/contactus" element={<Contactus />}/>
        <Route path="/aboutus" element={<Aboutus />} />
        <Route path="/edit-employee/:id" element={<EditEmployee/>}/>
        <Route path="/create-employee" element={<CreateEmployee />} />
        <Route path="/employee-list" element={<EmployeeList />} />
        <Route path="/check-attendance" element={<CheckAttendance />} />
        <Route path="/record-time" element={<RecordTime/>}/>
        <Route path="/attendance-queries" element={<AttendanceQueries />} />
      </Routes>
    </HashRouter>
   
     </div>
  );
}


export default App;