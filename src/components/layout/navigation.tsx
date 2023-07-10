import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faAlignLeft, faPowerOff } from "@fortawesome/free-solid-svg-icons"
import { Navbar, Button, Nav, Image, Row, Col, Dropdown } from "react-bootstrap"
import { AuthContext } from 'providers/authContext'
import { Fragment, useContext, useState } from 'react'
import { Confirm } from "components/alerts/confirm"
import { useLocalStorage } from "hooks/useLocalStorage"
import { useNavigate } from 'react-router-dom'
import { ChangeModal } from "pages/auth/changeModal"

export const Navigation = ({ toggle }: { toggle: any }) => {

  const navigate = useNavigate()
  const { removeItem, keySession } = useLocalStorage()
  const { session, setSession } = useContext(AuthContext);
  const [show, setShow] = useState(false)
  const [changePass, setChangePass] = useState(false)

  const handleClose = () => {
      setShow(!show)
  }

  const handleCloseSesion = () => {
    setSession(null)
    removeItem(keySession)
  }

  const goToProfile = () => {
    navigate('/profile')
  }

  const goToChange = () => {
    setChangePass(true)
  }

  return (
    <Fragment>
    <Navbar bg="light" className="navbar shadow-sm p-2 mb-5 bg-white rounded" expand>
        <Button variant="outline-info" onClick={ toggle }>
          <FontAwesomeIcon icon={faAlignLeft} />
        </Button>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="ms-auto" navbar>
            <Dropdown>
              <Dropdown.Toggle variant="">
                <div className="d-inline-flex">
                  <div className="d-flex flex-column" style={{ paddingRight: '10px' }}>
                    <Image style={{ height: '40px', width: '40px' }} className="rounded rounded-circle" src={ 'https://static.vecteezy.com/system/resources/previews/008/442/086/original/illustration-of-human-icon-user-symbol-icon-modern-design-on-blank-background-free-vector.jpg' } />
                  </div>
                  <div className="d-flex flex-column" style={{ paddingRight: '15px' }}>
                    <div className="text-dark">{ `${session.Nombres} ${session.Apellido_Paterno} ${session.Apellido_Materno}` }</div>
                    <div className="text-muted" style={{ fontSize: '12px' }}>{ session.Roles.Nombre }</div>
                  </div>
                </div>
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item onClick={ goToProfile }>Mi perfil</Dropdown.Item>
                <Dropdown.Item onClick={ goToChange }>Cambiar contraseña</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
            <FontAwesomeIcon onClick={ handleClose } className="text-muted p-2" size="xl" style={{ cursor: 'pointer' }} icon={ faPowerOff } />

          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <Confirm show={ show } handleClose={ handleClose } action={ handleCloseSesion } title='Cierre de sesión' message='¿Está seguro que desea cerrar la sesión?'/>
      {
        !!changePass &&
          <ChangeModal show={ changePass } handleClose={ () => setChangePass(false) }/>
      }
    </Fragment>
  )
}