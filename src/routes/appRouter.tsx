import { useState } from 'react';
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

import { Sidebar } from 'components/layout/sidebar';
import { Content } from "components/layout/content";

import { Home } from 'pages/home/home';
import { Error } from 'pages/common/error';
import { Appointment } from 'pages/medical/appointment';
import { Doctor } from 'pages/persons/doctor';
import { Patient } from 'pages/persons/patient';
import { Profile } from 'pages/persons/profile';
import { Schedule } from 'pages/medical/schedule';
import { Timetable } from 'pages/medical/timetable';
import { useLocalStorage } from 'hooks/useLocalStorage';

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
              <Route path="/" element={ <Home/> } />
              <Route path="/appointment" element={ <Appointment/> } />
              <Route path="/doctor" element={ <Doctor/> } />
              <Route path="/patient" element={ <Patient/> } />
              <Route path="/profile" element={ <Profile/> } />
              <Route path="/schedules" element={ <Schedule/> } />
              <Route path="/timetable" element={ <Timetable/> } />
              <Route path="*" element={ <Error/> } />
            </Routes>
           }/>
        </div>
    </BrowserRouter>
  )
}

export default AppRouter