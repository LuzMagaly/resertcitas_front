import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faHome, faUserCircle, faTimes, faUserDoctor, faWheelchair, faClipboardList, faCalendarWeek, faClock, faCoins, faShieldHalved, faPeopleArrows } from "@fortawesome/free-solid-svg-icons"
import { Nav, Button } from "react-bootstrap"
import { Link, useLocation } from "react-router-dom"
import { routes } from 'routes/paths'

export const Sidebar = ({ toggle, isOpen }: { toggle: any, isOpen: any }) => {

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

          <Link to={ routes.home }>
            <Nav.Item className={ 'itembar ' + (location.pathname === `/${ routes.home }`? 'active' : '') } style={{ padding: '7px 0px 7px 20px' }}>
                <FontAwesomeIcon icon={faHome} style={{paddingRight: '10px'}}/>
                Inicio
            </Nav.Item>
          </Link>

          <Link to={ routes.profile }>
            <Nav.Item className={ 'itembar ' + (location.pathname === `/${ routes.profile }` ? 'active' : '') } style={{ padding: '7px 0px 7px 20px' }}>
                <FontAwesomeIcon icon={ faUserCircle } style={{paddingRight: '10px'}}/>
                Mi Perfil
            </Nav.Item>
          </Link>

          <Link to={ routes.patient }>
            <Nav.Item className={ 'itembar ' + (location.pathname === `/${ routes.patient }` ? 'active' : '') } style={{ padding: '7px 0px 7px 20px' }}>
                <FontAwesomeIcon icon={ faWheelchair } style={{paddingRight: '10px'}}/>
                Pacientes
            </Nav.Item>
          </Link>

          <Link to={ routes.doctor }>
            <Nav.Item className={ 'itembar ' + (location.pathname === `/${ routes.doctor }` ? 'active' : '') } style={{ padding: '7px 0px 7px 20px' }}>
                <FontAwesomeIcon icon={ faUserDoctor } style={{paddingRight: '10px'}}/>
                Médicos
            </Nav.Item>
          </Link>

          <Link to={ routes.timetable }>
            <Nav.Item className={ 'itembar ' + (location.pathname === `/${ routes.timetable }` ? 'active' : '') } style={{ padding: '7px 0px 7px 20px' }}>
              <FontAwesomeIcon icon={ faCalendarWeek } style={{paddingRight: '10px'}}/>
                Horarios
            </Nav.Item>
          </Link>

          <Link to={ routes.schedules }>
            <Nav.Item className={ 'itembar ' + (location.pathname === `/${ routes.schedules }` ? 'active' : '') } style={{ padding: '7px 0px 7px 20px' }}>
              <FontAwesomeIcon icon={ faClock } style={{paddingRight: '10px'}}/>
                Calendario
            </Nav.Item>
          </Link>

          <Link to={ routes.appointment }>
            <Nav.Item className={ 'itembar ' + (location.pathname === `/${ routes.appointment }` ? 'active' : '') } style={{ padding: '7px 0px 7px 20px' }}>
                <FontAwesomeIcon icon={ faClipboardList } style={{paddingRight: '10px'}}/>
                Citas
            </Nav.Item>
          </Link>

          <Link to={ routes.permisions }>
            <Nav.Item className={ 'itembar ' + (location.pathname === `/${ routes.permisions }` ? 'active' : '') } style={{ padding: '7px 0px 7px 20px' }}>
                <FontAwesomeIcon icon={ faShieldHalved } style={{paddingRight: '10px'}}/>
                Permisos
            </Nav.Item>
          </Link>

          <Link to={ routes.users }>
            <Nav.Item className={ 'itembar ' + (location.pathname === `/${ routes.users }` ? 'active' : '') } style={{ padding: '7px 0px 7px 20px' }}>
                <FontAwesomeIcon icon={ faPeopleArrows } style={{paddingRight: '10px'}}/>
                Usuarios
            </Nav.Item>
          </Link>

        </Nav>
      </div>
  )
}