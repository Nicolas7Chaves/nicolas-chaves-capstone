import './App.scss';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Attendance from './components/Attendance/Attendance';
import Employees from './components/Employees/Employees';

function App() {
  return (
    <BrowserRouter>
      {/* <Header /> */}
      <Routes>
        {/* <Route path='/' element={<Home />} /> */}
        <Route path='/employees' element={<Employees />} />
        <Route path='/attendance' element={<Attendance />} />
      </Routes>
      {/* <Footer /> */}
    </BrowserRouter>
  );
}

export default App;
