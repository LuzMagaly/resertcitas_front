import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faHome, faUserCircle, faTimes, faUserDoctor, faWheelchair, faClipboardList, faCalendarWeek, faClock, faCoins } from "@fortawesome/free-solid-svg-icons"
import { Nav, Button } from "react-bootstrap"
import { Link, useLocation } from "react-router-dom"

const Sidebar = ({ toggle, isOpen }: { toggle: any, isOpen: any }) => {

  const location = useLocation()

  return (
    <div className={ `sidebar ${ isOpen &&'is-open' }`}>
        <div className="sidebar-header">
          <Button
            variant="link"
            onClick={ toggle }
            style={{ color: "#fff" }}
            className="mt-4"
          >
            <FontAwesomeIcon icon={faTimes} pull="right" size="xs" />
          </Button>
          <h3>ResertCita</h3>
        </div>

        <Nav className="flex-column pt-2">
          <p style={{paddingLeft: '15px'}}>Heading</p>

          <Link to="/">
            <Nav.Item className={ 'itembar ' + (location.pathname === '/'? 'active' : '') } style={{ padding: '7px 0px 7px 20px' }}>
                <FontAwesomeIcon icon={faHome} style={{paddingRight: '10px'}}/>
                Inicio
            </Nav.Item>
          </Link>

          <Link to="/profile">
            <Nav.Item className={ 'itembar ' + (location.pathname === '/profile'? 'active' : '') } style={{ padding: '7px 0px 7px 20px' }}>
                <FontAwesomeIcon icon={ faUserCircle } style={{paddingRight: '10px'}}/>
                Mi Perfil
            </Nav.Item>
          </Link>

          <Link to="/patient">
            <Nav.Item className={ 'itembar ' + (location.pathname === '/patient'? 'active' : '') } style={{ padding: '7px 0px 7px 20px' }}>
                <FontAwesomeIcon icon={ faWheelchair } style={{paddingRight: '10px'}}/>
                Pacientes
            </Nav.Item>
          </Link>

          <Link to="/doctor">
            <Nav.Item className={ 'itembar ' + (location.pathname === '/doctor'? 'active' : '') } style={{ padding: '7px 0px 7px 20px' }}>
                <FontAwesomeIcon icon={ faUserDoctor } style={{paddingRight: '10px'}}/>
                Médicos
            </Nav.Item>
          </Link>

          <Link to="/schedules">
            <Nav.Item className={ 'itembar ' + (location.pathname === '/schedules'? 'active' : '') } style={{ padding: '7px 0px 7px 20px' }}>
                <FontAwesomeIcon icon={ faCalendarWeek } style={{paddingRight: '10px'}}/>
                Mi Horario
            </Nav.Item>
          </Link>

          <Link to="/timetable">
            <Nav.Item className={ 'itembar ' + (location.pathname === '/timetable'? 'active' : '') } style={{ padding: '7px 0px 7px 20px' }}>
                <FontAwesomeIcon icon={ faClock } style={{paddingRight: '10px'}}/>
                Calendario
            </Nav.Item>
          </Link>

          <Link to="/appointment">
            <Nav.Item className={ 'itembar ' + (location.pathname === '/appointment'? 'active' : '') } style={{ padding: '7px 0px 7px 20px' }}>
                <FontAwesomeIcon icon={ faClipboardList } style={{paddingRight: '10px'}}/>
                Citas
            </Nav.Item>
          </Link>

        </Nav>
      </div>
  )
}

export default Sidebar