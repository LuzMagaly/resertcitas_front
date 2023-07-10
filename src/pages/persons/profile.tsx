import { Fragment, useState, useEffect, useContext } from 'react'
import { Container, Button } from 'react-bootstrap'
import { UserForm } from 'pages/persons/userForm'
import { getUserById } from 'services/userService'
import { Navigate } from 'react-router-dom'
import { AuthContext } from 'providers/authContext'
import { Loading } from 'components/alerts/loading'

export const Profile = () => {
  const { session } = useContext(AuthContext)
  const [data, setData] = useState()
  const [eventSave, setEventSave] = useState(0)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    getProfile()
  }, [])

  const getProfile = async () => {
    setLoading(true)
    const result = await getUserById(session.Id)
    setLoading(false)
    if(result){
      setData(result)
    }
    else{
      return (<Navigate to="/" />);
    }
  }

  return (
    <Fragment>
      <Container fluid>
      <div className="d-flex">
          <div className="me-auto">
            <h2>Mi perfil</h2>
          </div>
          <div className="p-2 bd-highlight">
            <Button variant="primary" onClick={ () => setEventSave(eventSave + 1) }>Guardar cambios</Button>{' '}
          </div>
        </div>
        <hr/>
          <UserForm data={ data } onEventSave={ eventSave }/>
      </Container>
      {
          !!loading &&
          <Loading show={ loading } />
      }
    </Fragment>
  )
}