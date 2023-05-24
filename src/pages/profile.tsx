import { Fragment, useState } from 'react'
import { Container, Button } from 'react-bootstrap'
import UserForm from './forms/userForm'

const Profile = () => {
  return (
    <Fragment>
      <Container fluid>
        <div className="d-flex bd-highlight mb-3">
          <div className="me-auto p-2 bd-highlight">
            <h1>Mi perfil</h1>
          </div>
          <div className="p-2 bd-highlight">
          <Button variant="primary">Confirmar Cambios</Button>{' '}
          <Button variant="secondary">Cambiar contraseña</Button>{' '}
          </div>
        </div>
        <hr/>
          <UserForm />
      </Container>

    </Fragment>
  )
}

export default Profile