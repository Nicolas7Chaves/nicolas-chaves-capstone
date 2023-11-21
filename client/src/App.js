import './App.scss';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import DashboardPage from './pages/Dashboard/DashboardPage';
import EmployeesPage from './pages/Employees/EmployeesPage';
import AttendancePage from './pages/AttendancePage/AttendancePage';
import ClockIn from './components/ClockIn/ClockIn';

function App() {
  return (
    <BrowserRouter>
      {/* <Header /> */}
      <Routes>
        {/* <Route path='/' element={<Home />} /> */}
        <Route path='/dashboard' element={<DashboardPage />} />
        <Route path='/dashboard/clockin' element={<ClockIn />} />
        <Route path='/employees' element={<EmployeesPage />} />
        <Route path='/attendance' element={<AttendancePage />} />
      </Routes>
      {/* <Footer /> */}
    </BrowserRouter>
  );
}

export default App;
