import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Image from "react-bootstrap/Image"
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Stack from 'react-bootstrap/Stack'
import { useState, useContext } from 'react'
import { Authenticate } from '../services/authService'
import { AuthContext } from '../providers/authContext'

const Login = () => {
  const { setSession } = useContext(AuthContext);

  const [user, setUser] = useState('')
  const [pass, setPass] = useState('')

  const [userState, setUserState] = useState(0)
  const [passState, setPassState] = useState(0)

  const [userMessage, setUserMessage] = useState('')
  const [passMessage, setPassMessage] = useState('')

  const handleOnSubmit = () => {
    if(user.trim() === ''){
      setUserMessage('Ingresa tu usuario')
      setUserState(2)
    }

    if(pass.trim() === ''){
      setPassMessage('Ingresa tu contraseña')
      setPassState(2)
    }

    if(pass.trim() === '' || user.trim() === ''){
      return
    }

    const resultUser = Authenticate(user.trim(), pass.trim())
    if(!resultUser){
      setUserMessage('Credenciales inválidas')
      setPassMessage('Credenciales inválidas')
      setUserState(2)
      setPassState(2)
      return
    }

    console.log('setting user')

    setSession(resultUser)
  }

  const handleOnChangeUser = (value: string) => {
    setUser(value)
    setUserState(0)
  }

  const handleOnChangePass = (value: string) => {
    setPass(value)
    setPassState(0)
  }

  const handleOnBlurUser = () => {
    setUserMessage('Ingresa tu usuario')
    setUserState((user.trim() !== '') ? 1 : 2)
  }

  const handleOnBlurPass = () => {
    setPassMessage('Ingresa tu contraseña')
    setPassState((pass.trim() !== '') ? 1 : 2)
  }

  return (
    <div style={{height: '100vh', position: 'relative', backgroundColor: '#F4FAFF'}}>
      <div style={{margin: 0, position: 'absolute', top: '25%', left: '20%', right: '20%', backgroundColor: '#FFF', border: '1px solid #FFF', borderRadius: '10px'}}>
        <Container>
          <Row>
            <Col sm={12} lg={6}>
              <Row className="justify-content-md-center">
                <Col md="auto">
                  <h2 style={{paddingTop: '30px'}}>Vienbenido de nuebo..</h2>
                  <p style={{color: '#767676'}}>Ingresa tus credenciales para iniciar sesión</p>
                  <Form>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                      <Form.Label>Usuario</Form.Label>
                      <Form.Control type="email" placeholder="Ingresa usuario" onChange={ (event: any) => handleOnChangeUser(event.target.value) } onBlur={ handleOnBlurUser } value={ user } isInvalid={ (userState === 2)? true : false } isValid={ (userState === 1)? true : false } required />
                      {
                        userState === 2 &&
                        <Form.Text className="text-danger">
                          { userMessage }
                        </Form.Text>
                      }
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                      <Form.Label>Contraseña</Form.Label>
                      <Form.Control type="password" placeholder="Contraseña" onChange={ (event: any) => handleOnChangePass(event.target.value) } onBlur={ handleOnBlurPass } value={ pass } isInvalid={ (passState === 2)? true : false } isValid={ (passState === 1)? true : false } required />
                      {
                        passState === 2 &&
                        <Form.Text className="text-danger">
                          { passMessage }
                        </Form.Text>
                      }
                    </Form.Group>
                    <br/>
                    <Stack gap={1} className="col-md-5 mx-auto">
                      <Button variant="primary" type="button" onClick={ handleOnSubmit }>
                        Iniciar sesión
                      </Button>
                    </Stack>
                  </Form>
                </Col>
              </Row>
            </Col>
            <Col sm={12} lg={6}>
              <Image fluid src="https://cdn.dribbble.com/users/3786931/screenshots/14893447/image.png" />
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  )
}

export default Login