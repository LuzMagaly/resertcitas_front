import { useState, useEffect, useContext } from 'react' //noesreactivo,
import { Col, Form, Row, Image, Button } from 'react-bootstrap'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import { AuthContext } from '../../providers/authContext'
import Confirm from "../../components/confirm"
import { createUser } from '../../services/userService'
import { updateUser } from '../../services/userService'
import { updatePassword } from '../../services/userService'

<<<<<<< HEAD
const UserForm = ({ data }: { data: any }) => {
//cicli de vida,simular3compor,siertaslogicas,extraer,ejeciituca
//
    //#region [ VARIABLES ]//1f 2partes, modific el vlo,1variavle y lo que mdica a la vari
        const { session } = useContext(AuthContext)//seadefinido
=======
const UserForm = ({ data, onEventSave, callbackResponse }: { data: any, onEventSave: number, callbackResponse?: any }) => {

    //#region [ VARIABLES ]
        const { session } = useContext(AuthContext)
>>>>>>> d16128aab6d2d21bc3ef7083f9d9decf21012e8a
        const [show, setShow] = useState(false)
        const [statusRow, setStatusRow] = useState(0) //status: 0 is new, 1 is update

        const [DNI, setDNI] = useState<any>({ value: '', state: 0, message: '' })
        const [Nombres, setNombres] = useState<any>({ value: '', state: 0, message: '' })
        const [Apellido_Paterno, setApellido_Paterno] = useState<any>({ value: '', state: 0, message: '' })
        const [Apellido_Materno, setApellido_Materno] = useState<any>({ value: '', state: 0, message: '' })
        const [Fecha_Nacimiento, setFecha_Nacimiento] = useState<any>({ value: '', state: 0, message: '' })
        const [Direccion, setDireccion] = useState<any>({ value: '', state: 0, message: '' })
        const [Telefono, setTelefono] = useState<any>({ value: '', state: 0, message: '' })
        const [Correo, setCorreo] = useState<any>({ value: '', state: 0, message: '' })
        const [Sexo, setSexo] = useState<any>({ value: 'Seleccionar', state: 0, message: '' })

    //#endregion

    //#region [ EFFECTS ]
    useEffect(() => {
      loadData()
    }, [data])

    useEffect(() => {
        if(onEventSave != 0){
            saveUser()
        }
      }, [onEventSave])

    //#endregion

    //#region [ METHODS ]

        const loadData = async () => {
            if(!data){
                return
            }
            setStatusRow(1)
            setDNI({ value: data.DNI, state: 0, message: '' })
            setNombres({ value: data.Nombres, state: 0, message: '' })
            setApellido_Paterno({ value: data.Apellido_Paterno, state: 0, message: '' })
            setApellido_Materno({ value: data.Apellido_Materno, state: 0, message: '' })
            setFecha_Nacimiento({ value: (new Date(data.Fecha_Nacimiento).toISOString().split('T')[0]), state: 0, message: '' })
            setDireccion({ value: data.Direccion, state: 0, message: '' })
            setTelefono({ value: data.Telefono, state: 0, message: '' })
            setCorreo({ value: data.Correo, state: 0, message: '' })
            setSexo({ value: data.Sexo, state: 0, message: '' })
        }

        //default method to init
        const saveUser = async() => {

            if(DNI.value == '' || Nombres.value == '' || Apellido_Paterno.value == '' || Apellido_Materno.value == '' || Fecha_Nacimiento.value == '' || Direccion.value == '' || Telefono.value == '' || Correo.value == '' || Sexo.value == 'Seleccionar'){
                return
            }
            handleToggleConfirm()
        }

        const sendData = async() => {
            const payload: any = {
                Item: {
                    Id_Rol: 1,
                    DNI: DNI.value,
                    Nombres: Nombres.value,
                    Apellido_Paterno: Apellido_Paterno.value,
                    Apellido_Materno: Apellido_Materno.value,
                    Fecha_Nacimiento: Fecha_Nacimiento.value,
                    Direccion: Direccion.value,
                    Telefono: Telefono.value,
                    Correo: Correo.value,
                    Sexo: Sexo.value,
                    Estado: 'ACTIVO',
                    Foto: null
                }
            }
            let result: any;
            if(statusRow == 0){
                payload.Item.Contrasenia = payload.DNI //default pass
                payload.Item.Creado_Por = session.Id
                result = await createUser(payload)
            }
            if (statusRow == 1){
                payload.Item.Id = data.Id
                payload.Item.Actualizado_Por = session.Id
                result = await updateUser(payload)
            }
            if(callbackResponse){
                callbackResponse(result)
            }
            handleToggleConfirm()
        }

        const changePassword = async () => {
        }

    //#endregion

    //#region [ EVENTS ]

        const handleToggleConfirm = () => {
            setShow(!show)
        }

        const handleChangeDNI = (event: any) => {
            const _value = event.target.value
            if(!_value){
                setDNI({ value: DNI.value, state: 2, message: 'Completa este campo' })
            }
            setDNI({ value: _value, state: 1, message: '' })
        }

        const handleChangeNombres = (event: any) => {
            const _value = event.target.value
            if(!_value){
                setNombres({ value: Nombres.value, state: 2, message: 'Completa este campo' })
            }
            setNombres({ value: _value, state: 1, message: '' })
        }

        const handleChangeApellido_Paterno = (event: any) => {
            const _value = event.target.value
            if(!_value){
                setApellido_Paterno({ value: Apellido_Paterno.value, state: 2, message: 'Completa este campo' })
            }
            setApellido_Paterno({ value: _value, state: 1, message: '' })
        }

        const handleChangeApellido_Materno = (event: any) => {
            const _value = event.target.value
            if(!_value){
                setApellido_Materno({ value: Apellido_Materno.value, state: 2, message: 'Completa este campo' })
            }
            setApellido_Materno({ value: _value, state: 1, message: '' })
        }

        const handleChangeFecha_Nacimiento = (event: any) => {
            const _value = event.target.value
            if(!_value){
                setFecha_Nacimiento({ value: Fecha_Nacimiento.value, state: 2, message: 'Completa este campo' })
            }
            setFecha_Nacimiento({ value: _value, state: 1, message: '' })
        }

        const handleChangeDireccion = (event: any) => {
            const _value = event.target.value
            if(!_value){
                setDireccion({ value: Direccion.value, state: 2, message: 'Completa este campo' })
            }
            setDireccion({ value: _value, state: 1, message: '' })
        }

        const handleChangeTelefono = (event: any) => {
            const _value = event.target.value
            if(!_value){
                setTelefono({ value: Telefono.value, state: 2, message: 'Completa este campo' })
            }
            setTelefono({ value: _value, state: 1, message: '' })
        }

        const handleChangeCorreo = (event: any) => {
            const _value = event.target.value
            if(!_value){
                setCorreo({ value: Correo.value, state: 2, message: 'Completa este campo' })
            }
            setCorreo({ value: _value, state: 1, message: '' })
        }

        const handleChangeSexo = (event: any) => {
            const _value = event.target.value
            if(!_value){
                setSexo({ value: Sexo.value, state: 2, message: 'Completa este campo' })
            }
            setSexo({ value: _value, state: 1, message: '' })
        }

    //#endregion

  return (
    <Form>
        <div className="mx-auto" style={{ height: '255px', width: '255px', maxHeight: '255px', maxWidth: '255px' }}>
            <div className='position-relative'>
                <div className="position-absolute top-0 start-0">
                <Button variant="secondary">
                    <FontAwesomeIcon icon={ faTimes } color='secondary'/>
                </Button>
                </div>
            </div>
            <div className="border border-secondary border-5 rounded rounded-circle" >
                <div className="m-2">
                    <Image className="rounded rounded-circle" fluid src="https://img.freepik.com/vector-gratis/ejemplo-lindo-icono-vector-historieta-hombre-barba-concepto-icono-familia-personas-aislado-vector-premium-estilo-dibujos-animados-plana_138676-3757.jpg?w=2000" />
                </div>
            </div>
        </div>

        <Row>
            <Col sm="8">
                <Form.Group className="mb-3" >
                    <Form.Label>Nombres</Form.Label>
                    <Form.Control isInvalid={ Nombres.value.length == 0 ? true : false } isValid={ Nombres.value.length > 2 ? true : false } value={ Nombres.value } onChange={ handleChangeNombres } type="text" placeholder="Ingrese sus nombres completos" autoFocus />
                </Form.Group>
            </Col>
            <Col sm="4">
                <Form.Group className="mb-3">
                    <Form.Label>DNI</Form.Label>
                    <Form.Control isInvalid={ DNI.value.length == 0 ? true : false } isValid={ DNI.value.length > 7 ? true : false } value={ DNI.value } onChange={ handleChangeDNI } type="number" placeholder="XXXXXXXX" />
                </Form.Group>
            </Col>
        </Row>

        <Row>
            <Col sm="6">
                <Form.Group className="mb-3">
                    <Form.Label>Apellido paterno</Form.Label>
                    <Form.Control isInvalid={ Apellido_Paterno.value.length == 0 ? true : false } isValid={ Apellido_Paterno.value.length > 2 ? true : false } value={ Apellido_Paterno.value } onChange={ handleChangeApellido_Paterno } type="text" placeholder="Ingrese su apellido paterno" />
                </Form.Group>
            </Col>
            <Col sm="6">
                <Form.Group className="mb-3">
                    <Form.Label>Apellido materno</Form.Label>
                    <Form.Control isInvalid={ Apellido_Materno.value.length == 0 ? true : false } isValid={ Apellido_Materno.value.length > 2 ? true : false } value={ Apellido_Materno.value } onChange={ handleChangeApellido_Materno } type="text" placeholder="Ingrese su apellido materno" />
                </Form.Group>
            </Col>
        </Row>

        <Row>
            <Col sm="8">
                <Form.Group className="mb-3">
                    <Form.Label>Fecha de nacimiento</Form.Label>
                    <Form.Control isInvalid={ Fecha_Nacimiento.value.length == 0 ? true : false } isValid={ Fecha_Nacimiento.value.length > 0 ? true : false } value={ Fecha_Nacimiento.value } onChange={ handleChangeFecha_Nacimiento } type="date" placeholder="DD/MM/YYYY" />
                </Form.Group>
            </Col>
            <Col sm="4">
                <Form.Group className="mb-3">
                    <Form.Label>Sexo</Form.Label>
                    <Form.Select value={ Sexo.value } onChange={ handleChangeSexo } isInvalid={ Sexo.value == 'Seleccionar' ? true : false } isValid={ Sexo.value != 'Seleccionar' ? true : false }>
                        <option>Seleccionar</option>
                        <option value="M">Masculino</option>
                        <option value="F">Femenino</option>
                    </Form.Select>
                </Form.Group>
            </Col>
        </Row>

        <Row>
            <Col sm="8">
                <Form.Group className="mb-3">
                    <Form.Label>Correo electrónico</Form.Label>
                    <Form.Control isInvalid={ Correo.value.length == 0 ? true : false } isValid={ Correo.value.length > 0 ? true : false } value={ Correo.value } onChange={ handleChangeCorreo } type="email" placeholder="mi_email@email.com" />
                </Form.Group>
            </Col>
            <Col sm="4">
                <Form.Group className="mb-3">
                    <Form.Label>Teléfono</Form.Label>
                    <Form.Control isInvalid={ Telefono.value.length == 0 ? true : false } isValid={ Telefono.value.length > 0 ? true : false } value={ Telefono.value } onChange={ handleChangeTelefono } type="text" placeholder="xxx xxx xxx" />
                </Form.Group>
            </Col>
        </Row>

        <Form.Group className="mb-3">
            <Form.Label>Dirección</Form.Label>
            <Form.Control isInvalid={ Direccion.value.length == 0 ? true : false } isValid={ Direccion.value.length > 0 ? true : false } value={ Direccion.value } onChange={ handleChangeDireccion } type="text" placeholder="Ingrese su dirección" />
        </Form.Group>

        <br/>
        {/* <div className="mb-5 text-center">
            <Button variant="primary" onClick={ saveUser }>Confirmar Cambios</Button>{' '}
            {
                (statusRow == 1 && session.Id == data.Id) &&
                <Button variant="secondary" onClick={ changePassword }>Cambiar contraseña</Button>
            }
        </div><br/> */}
        <Confirm show={ show } handleClose={ handleToggleConfirm } action={ sendData } title='Confirmación de guardado' message='¿Está seguro que desea guardar los datos?'/>
    </Form>
  )
}

export default UserForm