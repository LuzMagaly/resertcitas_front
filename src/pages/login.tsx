import { Container, Row, Col, Image, Button, Form, Stack, InputGroup, Spinner } from 'react-bootstrap'
import { useState, useContext, Fragment } from 'react'
import { Authenticate } from '../services/authService'
import { AuthContext } from '../providers/authContext'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faEye, faEyeSlash, faCheck } from '@fortawesome/free-solid-svg-icons'

const Login = () => {
  const { setSession } = useContext(AuthContext);

  //ONLY FOR TEST, DELETE THE CREDENTIALS!!!
  const [user, setUser] = useState('joaquinmedina@gmail.com')
  const [pass, setPass] = useState('1234')
  const [keepSessionOpen, setKeepSessionOpen] = useState(true)
  const [passIsVisible, setPassIsVisible] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const [userState, setUserState] = useState(0)
  const [passState, setPassState] = useState(0)

  const [userMessage, setUserMessage] = useState('')
  const [passMessage, setPassMessage] = useState('')

  const handleOnSubmit = async () => {
    if(user.trim() === ''){
      setUserMessage('Ingresa tu usuario')
      setUserState(2)
    }
    else{
      setUserState(1)
    }

    if(pass.trim() === ''){
      setPassMessage('Ingresa tu contraseña')
      setPassState(2)
    }
    else{
      setPassState(1)
    }

    if(pass.trim() === '' || user.trim() === ''){
      return
    }

    setIsLoading(true)
    const resultUser = await Authenticate(user.trim(), pass.trim(), keepSessionOpen)
    if(!resultUser){
      setUserMessage('Credenciales inválidas')
      setPassMessage('Credenciales inválidas')
      setUserState(2)
      setPassState(2)
    }
    else{
      setSession(resultUser)
    }
    setIsLoading(false)
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
                  <h2 style={{paddingTop: '30px'}}>Bienvenido de nuevo</h2>
                  <p style={{color: '#767676'}}>Ingresa tus credenciales para iniciar sesión</p>
                  <Form>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                      <Form.Label>Correo</Form.Label>
                      <Form.Control disabled={ !!isLoading } type="email" placeholder="Ingresa tu correo" onChange={ (event: any) => handleOnChangeUser(event.target.value) } onBlur={ handleOnBlurUser } value={ user } isInvalid={ (userState === 2)? true : false } isValid={ (userState === 1)? true : false } required />
                      {
                        userState === 2 &&
                        <Form.Text className="text-danger">
                          { userMessage }
                        </Form.Text>
                      }
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                      <Form.Label>Contraseña</Form.Label>
                      <InputGroup>
                        <Form.Control disabled={ !!isLoading } type={ !!passIsVisible ? 'text' : 'password' } placeholder="Ingresa tu contraseña" onChange={ (event: any) => handleOnChangePass(event.target.value) } onBlur={ handleOnBlurPass } value={ pass } isInvalid={ (passState === 2)? true : false } isValid={ (passState === 1)? true : false } required />
                        <Button disabled={ !!isLoading } variant={`outline-${(passState === 1) ? 'success' : (passState === 2) ? 'danger' : 'secondary' }`} onClick={ () => setPassIsVisible(!passIsVisible) }>
                          <FontAwesomeIcon icon={ !!passIsVisible? faEyeSlash : faEye }/>
                        </Button>
                      </InputGroup>
                      {
                        passState === 2 &&
                        <Form.Text className="text-danger">
                          { passMessage }
                        </Form.Text>
                      }
                    </Form.Group>

                    <Form.Check disabled={ !!isLoading } type="checkbox" label="Mantener la sesión iniciada" id="session-check" checked={ keepSessionOpen } onChange={ () => setKeepSessionOpen(!keepSessionOpen) }/>
                    <br/>
                    <Stack gap={1} className="col-md-8 mx-auto">
                      <Button variant="primary" type="button" onClick={ handleOnSubmit }>
                        {
                          !!!isLoading?
                          <Fragment><FontAwesomeIcon icon={ faCheck }/>{' '}Iniciar sesión</Fragment>
                          : <Fragment><Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true"/>{' '}Autenticando</Fragment>
                        }
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