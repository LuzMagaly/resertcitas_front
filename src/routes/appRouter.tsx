import { useContext, useState } from 'react';
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

import { Sidebar } from 'components/layout/sidebar';
import { Content } from "components/layout/content";

import { Home } from 'pages/home/home';
import { Error } from 'pages/common/error';
import { Appointment } from 'pages/admin/appointment';
import { Doctor } from 'pages/persons/doctor';
import { Patient } from 'pages/persons/patient';
import { Profile } from 'pages/persons/profile';
import { Schedule } from 'pages/medical/schedule';
import { Timetable } from 'pages/medical/timetable';
import { useLocalStorage } from 'hooks/useLocalStorage';
import { routes } from './paths';
import { Permisions } from 'pages/auth/permisions';
import { AuthContext } from 'providers/authContext';
import Users from 'pages/auth/users';

const AppRouter = () => {

  const { session } = useContext(AuthContext)
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
              <Route path={ routes.home } element={ <Home/> } />
              <Route path={ routes.appointment } element={ <Appointment/> } />
              <Route path={ routes.doctor } element={ <Doctor/> } />
              <Route path={ routes.patient } element={ <Patient/> } />
              <Route path={ routes.profile } element={ <Profile/> } />
              <Route path={ routes.schedules } element={ <Schedule/> } />
              <Route path={ routes.timetable } element={ <Timetable/> } />
              <Route path={ routes.permisions } element={ <Permisions/> } />
              <Route path={ routes.users } element={ <Users/> } />
              <Route path={ routes.error } element={ <Error/> } />
            </Routes>
           }/>
        </div>
    </BrowserRouter>
  )
}

export default AppRouter