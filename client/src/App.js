import './App.scss';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import DashboardPage from './pages/Dashboard/DashboardPage';
import EmployeesPage from './pages/Employees/EmployeesPage';
import AttendancePage from './pages/AttendancePage/AttendancePage';
import ClockIn from './components/ClockIn/ClockIn';
import Header from './components/Header/Header';
import HomePage from './pages/Home/HomePage';
import ClockOut from './components/ClockOut/ClockOut';

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/dashboard' element={<DashboardPage />} />
        <Route path='/dashboard/clockin' element={<ClockIn />} />
        <Route path='/dashboard/clockout' element={<ClockOut />} />
        <Route path='/employees' element={<EmployeesPage />} />
        <Route path='/attendance' element={<AttendancePage />} />
      </Routes>
      {/* <Footer /> */}
    </BrowserRouter>
  );
}

export default App;
