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

          <Nav.Item className={ location.pathname === '/'? 'active' : '' }>
            <Link to="/" className="nav-item">
              <FontAwesomeIcon icon={faHome} style={{paddingRight: '10px'}}/>
              Inicio
            </Link>
          </Nav.Item>

          <Nav.Item className={ location.pathname === '/profile'? 'active' : '' }>
            <Link to="/profile" className="nav-item">
              <FontAwesomeIcon icon={ faUserCircle } style={{paddingRight: '10px'}}/>
              Perfil
            </Link>
          </Nav.Item>

          <Nav.Item className={ location.pathname === '/patient'? 'active' : '' }>
            <Link to="/patient" className="nav-item">
              <FontAwesomeIcon icon={ faWheelchair } style={{paddingRight: '10px'}}/>
              Pacientes
            </Link>
          </Nav.Item>

          <Nav.Item className={ location.pathname === '/doctor'? 'active' : '' }>
            <Link to="/doctor" className="nav-item">
              <FontAwesomeIcon icon={ faUserDoctor } style={{paddingRight: '10px'}}/>
              Médicos
            </Link>
          </Nav.Item>

          <Nav.Item className={ location.pathname === '/schedules'? 'active' : '' }>
            <Link to="/schedules" className="nav-item">
              <FontAwesomeIcon icon={ faCalendarWeek } style={{paddingRight: '10px'}}/>
              Horarios
            </Link>
          </Nav.Item>

          <Nav.Item className={ location.pathname === '/timetable'? 'active' : '' }>
            <Link to="/timetable" className="nav-item">
              <FontAwesomeIcon icon={ faClock } style={{paddingRight: '10px'}}/>
              Agenda
            </Link>
          </Nav.Item>

          <Nav.Item className={ location.pathname === '/appointment'? 'active' : '' }>
            <Link to="/appointment" className="nav-item">
              <FontAwesomeIcon icon={ faClipboardList } style={{paddingRight: '10px'}}/>
              Citas
            </Link>
          </Nav.Item>

          <Nav.Item className={ location.pathname === '/payments'? 'active' : '' }>
            <Link to="/payments" className="nav-item">
              <FontAwesomeIcon icon={ faCoins } style={{paddingRight: '10px'}}/>
              Pagos
            </Link>
          </Nav.Item>

        </Nav>
      </div>
  )
}

export default Sidebar