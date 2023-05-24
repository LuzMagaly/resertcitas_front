import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faAlignLeft, faPowerOff } from "@fortawesome/free-solid-svg-icons"
import { Navbar, Button, Nav, Image, Row, Col } from "react-bootstrap"
import { Link } from "react-router-dom"
import { AuthContext } from '../providers/authContext'
import { useContext } from 'react'

const Navigation = ({ toggle }: { toggle: any }) => {

  const { setSession } = useContext(AuthContext);

  const handleCloseSesion = () => {
    setSession(null)
  }

  return (
    <Navbar bg="light" className="navbar shadow-sm p-2 mb-5 bg-white rounded" expand>
        <Button variant="outline-info" onClick={ toggle }>
          <FontAwesomeIcon icon={faAlignLeft} />
        </Button>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="ms-auto" navbar>
            <Link to="profile" className="text-muted">
                  <div className="d-inline-flex">
                    <div className="d-flex flex-column" style={{ paddingRight: '10px' }}>
                      <Image style={{ height: '40px', width: '40px' }} className="rounded rounded-circle" src="https://img.freepik.com/vector-gratis/ejemplo-lindo-icono-vector-historieta-hombre-barba-concepto-icono-familia-personas-aislado-vector-premium-estilo-dibujos-animados-plana_138676-3757.jpg?w=2000" />
                    </div>
                    <div className="d-flex flex-column" style={{ paddingRight: '15px' }}>
                      <div className="text-dark">Pablo Neruda Sanchez</div>
                      <div className="text-muted" style={{ fontSize: '12px' }}>micorreo@gmail.com</div>
                    </div>
                  </div>
              </Link>
              <FontAwesomeIcon onClick={ handleCloseSesion } className="text-muted p-2" size="xl" style={{ cursor: 'pointer' }} icon={faPowerOff} />

          </Nav>
        </Navbar.Collapse>
      </Navbar>
  )
}

export default Navigation