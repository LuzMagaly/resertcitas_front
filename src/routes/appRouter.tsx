import { useState } from 'react';
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

import Sidebar from '../components/sidebar';
import Content from "../components/content";

import Admin from '../pages/admin';
import Error from '../pages/error';
import Appointment from '../pages/appointment';
import Doctor from '../pages/doctor';
import Patient from '../pages/patient';
import Login from '../pages/login';
import Profile from '../pages/profile';

const AppRouter = () => {

  const [isOpen, setIsOpen] = useState<boolean>(JSON.parse(localStorage.getItem('sidebar') || '{}'))
  const [isAuthenticated, setIsAuthenticated] = useState(true);

  const toggle = () => {
    setIsOpen(!isOpen)
    localStorage.setItem('sidebar', JSON.stringify(!isOpen))
  };

  return (
    <BrowserRouter>
      {
        (!isAuthenticated)?
          <Routes>
            <Route path="*" element={ <Login/> } />
          </Routes>
        :
        <div className="App wrapper">
          <Sidebar toggle={ toggle } isOpen={ isOpen } />
          <Content toggle={ toggle } isOpen={ isOpen } children={
            <Routes>
              <Route path="/" element={ <Admin/> } />
              <Route path="/appointment" element={ <Appointment/> } />
              <Route path="/doctor" element={ <Doctor/> } />
              <Route path="/patient" element={ <Patient/> } />
              <Route path="/profile" element={ <Profile/> } />
              <Route path="/schedules" element={ <Profile/> } />
              <Route path="/timetable" element={ <Profile/> } />
              <Route path="*" element={ <Error/> } />
            </Routes>
           }/>
        </div>
      }
    </BrowserRouter>
  )
}

export default AppRouter