import { faCheck, faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Fragment, useState, useContext, useEffect } from "react"
import { Button, Modal, Form, InputGroup, Spinner, ProgressBar } from "react-bootstrap"
import { AuthContext } from "../../providers/authContext"
//import { updatePassword } from "../services/authService"
import { Proccessing } from "components/alerts/proccessing"
import { Alert } from "components/alerts/alert"

export const ChangeModal = ({ show, handleClose }: { show: boolean, handleClose: any }) => {

    const { session } = useContext(AuthContext)
    const [pass1, setPass1] = useState('')
    const [pass2, setPass2] = useState('')
    const [passIsVisible, setPassIsVisible] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [pass1State, setPass1State] = useState(0)
    const [pass2State, setPass2State] = useState(0)
    const [pass1Message, setPass1Message] = useState('')
    const [pass2Message, setPass2Message] = useState('')
    const [levelSecurity, setLevelSecurity] = useState(0)
    const [proccessing, setProccessing] = useState(false)
    const [alert, setAlert] = useState(false)

    const save = async () => {
        if(pass1State == 1 && pass2State == 1){
            setProccessing(true)
            const payload = {
                "user": session.pkid.toString(),
                "pass": pass1,
                "keep": true
              }
            const result = null//await updatePassword(payload)
            setProccessing(false)
            if(result){
                setAlert(true)
            }

        }
    }

    const handleOnChangePass1 = (value: string) => {
        setPass1(value)
        setPass1State(0)
        verifySecurePass(value)
    }

    const handleOnChangePass2 = (value: string) => {
        setPass2(value)
        setPass2State(0)
    }

    const handleOnBlurPass1 = () => {
        if(pass1.trim() == ''){
            setPass1Message('Escribe una contraseña nueva')
            setPass1State((pass1.trim() !== '') ? 1 : 2)
        }
        else{
            validatePass()
        }
    }

    const handleOnBlurPass2 = () => {
        if(pass2.trim() == ''){
            setPass2Message('Repite la contraseña nueva')
            setPass2State((pass2.trim() !== '') ? 1 : 2)
        }
        else{
            validatePass()
        }
    }

    const verifySecurePass = (pass: string) => {
        let levels = 0
        levels = (pass.length * 3)
        levels = Boolean(pass.match(/[A-Z]/)) ? (levels * 3) : levels
        levels = (/\d/.test(pass)) ? (levels * 3) : levels
        const specialChars = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/
        levels = (specialChars.test(pass)) ? (levels * 3) : levels
        levels = levels / 3
        setLevelSecurity(levels)
    }

    const validatePass = () => {
        if(pass1.trim() == pass2.trim()){
            setPass1State(1)
            setPass2State(1)
        }
        else{
            setPass2Message('Las contraseñas no coinciden')
            setPass2State(2)
        }
    }

    return (
        <Fragment>
            <Modal style={{ zIndex: 1050 }} show={ show } onHide={ handleClose } centered backdrop="static" keyboard={ false }>
                <Modal.Header closeButton>
                    <Modal.Title>Cambiar contraseña</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3">
                        <Form.Label>Escriba una contraseña nueva</Form.Label>
                        <InputGroup>
                            <Form.Control disabled={ !!isLoading } type={ !!passIsVisible ? 'text' : 'password' } placeholder="Ingresa tu contraseña" onChange={ (event: any) => handleOnChangePass1(event.target.value) } onBlur={ handleOnBlurPass1 } value={ pass1 } isInvalid={ (pass1State === 2)? true : false } isValid={ (pass1State === 1)? true : false } required />
                            <Button disabled={ !!isLoading } variant={`outline-${(pass1State === 1) ? 'success' : (pass1State === 2) ? 'danger' : 'secondary' }`} onClick={ () => setPassIsVisible(!passIsVisible) }>
                            <FontAwesomeIcon icon={ !!passIsVisible? faEyeSlash : faEye }/>
                            </Button>
                        </InputGroup>
                        <ProgressBar className="m-2" variant={ (levelSecurity > 70) ? 'success' : ((levelSecurity > 30) ? 'warning' : 'danger') } now={ levelSecurity } />
                        {
                            pass1State === 2 &&
                            <Form.Text className="text-danger">
                            { pass1Message }
                            </Form.Text>
                        }
                        </Form.Group>
                        <Form.Group className="mb-3">
                        <Form.Label>Repita la nueva contraseña</Form.Label>
                        <InputGroup>
                            <Form.Control disabled={ !!isLoading } type={ !!passIsVisible ? 'text' : 'password' } placeholder="Ingresa tu contraseña" onChange={ (event: any) => handleOnChangePass2(event.target.value) } onBlur={ handleOnBlurPass2 } value={ pass2 } isInvalid={ (pass2State === 2)? true : false } isValid={ (pass2State === 1)? true : false } required />
                            <Button disabled={ !!isLoading } variant={`outline-${(pass2State === 1) ? 'success' : (pass2State === 2) ? 'danger' : 'secondary' }`} onClick={ () => setPassIsVisible(!passIsVisible) }>
                            <FontAwesomeIcon icon={ !!passIsVisible? faEyeSlash : faEye }/>
                            </Button>
                        </InputGroup>
                        {
                            pass2State === 2 &&
                            <Form.Text className="text-danger">
                            { pass2Message }
                            </Form.Text>
                        }
                        </Form.Group>
                        <div className="text-center">
                            <Button className="m-2" variant="primary" type="button" onClick={ save } disabled={ !!isLoading }>
                                {
                                !!!isLoading?
                                <Fragment><FontAwesomeIcon icon={ faCheck }/>{' '}Guardar</Fragment>
                                : <Fragment><Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true"/>{' '}Autenticando</Fragment>
                                }
                            </Button>
                            <Button className="m-2" variant="outline-danger" onClick={ handleClose }>Cancelar</Button>
                        </div>
                    </Form>
                </Modal.Body>
            </Modal>
            {
                !!proccessing &&
                    <Proccessing show={ proccessing } title="Procesando" message="Se está cambiando la contraseña, no cierres ni salgas de esta página"/>
            }
            {
                !!alert &&
                    <Alert show={ alert } handleClose={ handleClose } title="Actualización de contraseña" message="La contraseña ha sido actualizada"/>
            }
        </Fragment>
    )
}