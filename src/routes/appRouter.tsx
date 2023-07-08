import { useState } from 'react';
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

import Sidebar from '../components/sidebar';
import Content from "../components/content";

import Admin from '../pages/admin';
import Error from '../pages/error';
import Appointment from '../pages/appointment';
import Doctor from '../pages/doctor';
import Patient from '../pages/patient';
import Profile from '../pages/profile';
import Schedules from '../pages/timetable';
import Timetable from '../pages/schedule';
import { useLocalStorage } from '../hooks/useLocalStorage';

const AppRouter = () => {

  const { getItem, setItem, keySidebar } = useLocalStorage()

  const [isOpen, setIsOpen] = useState<boolean>(getItem(keySidebar) == '1'? true : false)

  const toggle = () => {
    setIsOpen(!isOpen)
    setItem(keySidebar, !isOpen? '1' : '0')
  }

  return (
    <BrowserRouter>
      <div className="App wrapper">
          <Sidebar toggle={ toggle } isOpen={ isOpen } />
          <Content toggle={ toggle } isOpen={ isOpen } children={
            <Routes>
              <Route path="/" element={ <Admin/> } />
              <Route path="/appointment" element={ <Appointment/> } />
              <Route path="/doctor" element={ <Doctor/> } />
              <Route path="/patient" element={ <Patient/> } />
              <Route path="/profile" element={ <Profile/> } />
              <Route path="/schedules" element={ <Schedules/> } />
              <Route path="/timetable" element={ <Timetable/> } />
              <Route path="*" element={ <Error/> } />
            </Routes>
           }/>
        </div>
    </BrowserRouter>
  )
}

export default AppRouter