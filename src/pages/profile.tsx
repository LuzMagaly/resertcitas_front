import { Fragment, useState, useEffect, useContext } from 'react'
import { Container } from 'react-bootstrap'
import UserForm from './forms/userForm'
import { getUserById } from '../services/userService'
import { Navigate } from 'react-router-dom'
import { AuthContext } from '../providers/authContext'

const Profile = () => {
  const { session } = useContext(AuthContext)
  const [data, setData] = useState()

  useEffect(() => {
    getProfile()
  }, [])

  const getProfile = async () => {
    const result = await getUserById(session.Id)
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
          <UserForm data={ data }/>
      </Container>

    </Fragment>
  )
}

export default Profile