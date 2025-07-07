import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { Dashboard } from "./components/Dashboard";
import {SignIn} from "./components/Signin";
import { DoctorDashboard } from "./components/Admin/DoctorDashboard";
import { PatientManagement } from "./components/Admin/PatientManagement";
import { IncidentManagement } from "./components/Admin/IncidentManagement";
import { CalendarView } from "./components/Admin/CalendarView";
import { PatientPortal } from "./components/Patient/Patient";
import { initializeDemoData } from "./data/patientdemodata";
import { initializeDoctorDashboardData } from "./data/doctordashdata";
function App() {

   initializeDemoData();
   initializeDoctorDashboardData();
  return (
    <>
  <Router>
        <Routes> 
          <Route path="/" element={<Dashboard />} /> 
          <Route path="/signin" element={<SignIn/>}></Route>
          <Route path="/doctor-dashboard" element={<DoctorDashboard/>}></Route>
          <Route path="/incident" element={<IncidentManagement/>}></Route>
          <Route path="/patient-management" element ={<PatientManagement/>}></Route>
          <Route path="/calendar" element={<CalendarView/>}></Route>
          <Route path="/patient-dashboard" element={<PatientPortal/>}></Route>
        </Routes>
      </Router>
    </>
  )
}

export default App
