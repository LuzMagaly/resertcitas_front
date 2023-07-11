import { useState, useEffect } from 'react' //noesreactivo,
import { Col, Form, Row, Button } from 'react-bootstrap'
import { Confirm } from "components/alerts/confirm"
//import { createUser, existsUsername } from '../../services/userService'
import { updateUser } from '../../services/userService'
import { Proccessing } from 'components/alerts/proccessing'
import { Alert } from 'components/alerts/alert'
import Select from 'react-select';

export const UserForm = ({ data, handleClose, dataVis, dataRol, updateRows }: { data: any, handleClose: any, dataVis: any, dataRol: any, updateRows: any }) => {

    //#region [ VARIABLES ]

        const [confirmSave, setConfirmSave] = useState(false)
        const [proccessSave, setProccessSave] = useState(false)
        const [alertSave, setAlertSave] = useState(false)
        const [canSave, setCanSave] = useState(false)

        const [Username, setUsername] = useState<any>({ value: '', state: 2, message: 'Campo obligatorio' })
        const [Nombres, setNombres] = useState<any>({ value: '', state: 2, message: 'Campo obigatorio' })
        const [Apellido_Paterno, setApellido_Paterno] = useState<any>({ value: '', state: 0, message: '' })
        const [Apellido_Materno, setApellido_Materno] = useState<any>({ value: '', state: 0, message: '' })
        const [Correo, setCorreo] = useState<any>({ value: '', state: 0, message: '' })

        const [Visibilidad, setVisibilidad] = useState<any>({ value: [], state: 2, message: 'Seleccionar' })
        const [Rol, setRol] = useState<any>({ value: '3', state: 1, message: '' })
        const [Estado, setEstado] = useState<any>({ value: 'ACTIVO', state: 1, message: '' })

        const [visibilidadList, setVisibilidadList] = useState<any[]>([]) 

    //#endregion

    //#region [ EFFECTS ]

        useEffect(() => {
            loadData()
        }, [data])
        
        useEffect(() => {
            if(dataVis && dataVis.length && dataVis.length > 0){
                setVisibilidadList(loadOptionsVis(dataVis))
            }
        }, [dataVis])
        

        useEffect(() => {
            validateFields()
        }, [Username, Nombres, Apellido_Paterno, Apellido_Materno, Correo, Visibilidad, Rol, Estado])

    //#endregion

    //#region [ METHODS ]

        const loadData = () => {
            if(!data){
                return
            }
            setUsername({ value: data.username, state: data.username.length > 0 ? 1 : 2, message: 'Campo obligatorio' })
            setNombres({ value: data.nombres, state: data.nombres.length > 0 ? 1 : 2, message: 'Campo obligatorio' })
            setApellido_Paterno({ value: data.apellido_Paterno, state: 0, message: '' })
            setApellido_Materno({ value: data.apellido_Materno, state: 0, message: '' })
            setCorreo({ value: data.correo, state: 0, message: '' })
            setVisibilidad({ value: loadOptionsVis(data.visibilidades), state: 1, message: '' }) //loadOptionsVis(data.visibilidades)
            setRol({ value: data.iD_Rol, state: 1, message: '' })
            setEstado({ value: data.estado, state: 1, message: '' })
        }

        const loadOptionsVis = (arrayInn: any) => {
            let arrayTemp: any[] = []
            arrayInn.map((element: any) => {
                const item = {
                    value: element.pkid,
                    label: element.nombre
                }
                arrayTemp.push(item)
            })
            return arrayTemp
        }

        const saveUser = async() => {
            if(
                Username.state == 2 || 
                Nombres.state == 2 || 
                Visibilidad.value == 'Seleccionar' || 
                Rol.value == 'Seleccionar' || 
                Estado.value == 'Seleccionar'){
                return
            }
            handleToggleConfirm()
        }

        const validateFields = () => {
            let result = false
            
            if(Username.state != 2
                && Nombres.state != 2
                && Visibilidad.state != 2
                && Rol.state != 2
                && Estado.state != 2){
                result = true
            }
            setCanSave(result)
        }

        const sendData = async() => {
            handleToggleConfirm()
            let visibilidadesPayload: any[] = []


            Visibilidad.value.map((element: any) => {
                const item = {
                    "pkid": element.value,
                    "nombre": element.label,
                    "descripcion": "string",
                    "items": [
                        {
                        "iD_Table_1": 0,
                        "iD_Table_2": 0
                        }
                    ]
                }
                visibilidadesPayload.push(item)
            })

            const payload: any = {
                "pkid": 0,
                "username": Username.value,
                "nombres": Nombres.value,
                "apellido_Paterno": Apellido_Paterno.value,
                "apellido_Materno": Apellido_Materno.value,
                "correo": Correo.value,
                "estado": Estado.value,
                "visibilidad": "string",
                "iD_Rol": Rol.value,
                "rol_Nombre": "string",
                "visibilidades": visibilidadesPayload
            }
            let result = null
            if(!data){
                result = null//await createUser(payload)
            }
            else{
                payload.pkid = data.pkid
                result = null//await updateUser(payload)
            }
            setProccessSave(false)
            if(result){
                updateRows()
                handleClose()
            }
            else{
                setAlertSave(true)
            }
        }
        
        const verifyUsername = async () => {
            if(data && data.username && data.username == Username.value){
                return
            }
            if(Username.value && Username.value.length && Username.value.length < 4){
                setUsername({ value: Username.value, state: 2, message: 'Usuario muy corto' })
                return
            }
            const result = null//await existsUsername(Username.value)
            if(!result){
                setUsername({ value: Username.value, state: 2, message: 'Ya existe ese usuario, escriba otro' })
            }
        }

    //#endregion

    //#region [ EVENTS ]

        const handleToggleConfirm = () => {
            setConfirmSave(!confirmSave)
        }

        const handleChangeUsername = (event: any) => {
            const _value = event.target.value
            if(_value && _value != ''){
                setUsername({ value: _value, state: 1, message: '' })
            }
            else{
                setUsername({ value: _value, state: 2, message: 'Completa este campo' })
            }
        }

        const handleChangeNombres = (event: any) => {
            const _value = event.target.value
            if(_value && _value != ''){
                setNombres({ value: _value, state: 1, message: '' })
            }
            else{
                setNombres({ value: _value, state: 2, message: 'Completa este campo' })
            }
        }

        const handleChangeApellido_Paterno = (event: any) => {
            const _value = event.target.value
            if(_value && _value != ''){
                setApellido_Paterno({ value: _value, state: 1, message: '' })
            }
            else{
                setApellido_Paterno({ value: _value, state: 0, message: '' })
            }
        }

        const handleChangeApellido_Materno = (event: any) => {
            const _value = event.target.value
            if(_value && _value != ''){
                setApellido_Materno({ value: _value, state: 1, message: '' })
            }
            else{
                setApellido_Materno({ value: _value, state: 0, message: '' })
            }
        }

        const handleChangeCorreo = (event: any) => {
            const _value = event.target.value
            if(_value && _value != ''){
                setCorreo({ value: _value, state: 1, message: '' })
            }
            else{
                setCorreo({ value: _value, state: 0, message: '' })
            }
        }

        const handleChangeVisibilidad = (items: any) => {
            setVisibilidad({ value: items, state: 1, message: '' })
        }
        
        const handleChangeRol = (event: any) => {
            const _value = event.target.value
            if(_value && _value != '' && _value != 'Seleccionar'){
                setRol({ value: _value, state: 1, message: '' })
            }
            else{
                setRol({ value: _value, state: 2, message: 'Completa este campo' })
            }
        }

        const handleChangeEstado = (event: any) => {
            const _value = event.target.value
            if(_value && _value != '' && _value != 'Seleccionar'){
                setEstado({ value: _value, state: 1, message: '' })
            }
            else{
                setEstado({ value: _value, state: 2, message: 'Completa este campo' })
            }
        }

        const controlStylesValidation = (hasError: boolean, hasValid: boolean) => (
            hasValid ? { borderColor: '#198754' } : hasError ? { borderColor: '#dc3545' } : {}
        )

        const handleBlurVisibilidad = () => {
            if(Visibilidad.value.length == 0){
              setVisibilidad({ value: Visibilidad.value, state: 2, message: 'Selecciona una región' })
            }
        }

    //#endregion

    return (
        <Form>
            <Row>
                <Col sm="8">
                    <Form.Group className="mb-3" >
                        <Form.Label>Nombres</Form.Label>
                        <Form.Control isInvalid={ Nombres.state == 2 ? true : false } isValid={ Nombres.state == 1 ? true : false } value={ Nombres.value } onChange={ handleChangeNombres } type="text" placeholder="Ingrese sus nombres completos" autoFocus />
                        {
                            Nombres.state === 2 &&
                            <Form.Text className="text-danger">
                            { Nombres.message }
                            </Form.Text>
                        }
                    </Form.Group>
                </Col>
                <Col sm="4">
                    <Form.Group className="mb-3">
                        <Form.Label>Usuario</Form.Label>
                        <Form.Control onBlur={ verifyUsername } isInvalid={ Username.state == 2 ? true : false } isValid={ Username.state == 1 ? true : false } value={ Username.value } onChange={ handleChangeUsername } type="text" placeholder="username" />
                        {
                            Username.state === 2 &&
                            <Form.Text className="text-danger">
                            { Username.message }
                            </Form.Text>
                        }
                    </Form.Group>
                </Col>
            </Row>
            <Row>
                <Col sm="6">
                    <Form.Group className="mb-3">
                        <Form.Label>Apellido paterno</Form.Label>
                        <Form.Control isInvalid={ Apellido_Paterno.state == 2 ? true : false } isValid={ Apellido_Paterno.state == 1 ? true : false } value={ Apellido_Paterno.value } onChange={ handleChangeApellido_Paterno } type="text" placeholder="Ingrese su apellido paterno" />
                    </Form.Group>
                </Col>
                <Col sm="6">
                    <Form.Group className="mb-3">
                        <Form.Label>Apellido materno</Form.Label>
                        <Form.Control isInvalid={ Apellido_Materno.state == 2 ? true : false } isValid={ Apellido_Materno.state == 1 ? true : false } value={ Apellido_Materno.value } onChange={ handleChangeApellido_Materno } type="text" placeholder="Ingrese su apellido materno" />
                    </Form.Group>
                </Col>
            </Row>
            <Row>
                <Col sm="12">
                    <Form.Group className="mb-3">
                        <Form.Label>Correo electrónico</Form.Label>
                        <Form.Control isInvalid={ Correo.state == 2 ? true : false } isValid={ Correo.state == 1 ? true : false } value={ Correo.value } onChange={ handleChangeCorreo } type="email" placeholder="ejemplo@email.com" />
                    </Form.Group>
                </Col>
            </Row>
            <Row>
                <Col sm="4">
                    <Form.Group className="mb-3">
                        <Form.Label>Visibilidad</Form.Label>
                        <Select
                            value={ Visibilidad.value }
                            isMulti
                            name="colors"
                            options={ visibilidadList }
                            className="basic-multi-select"
                            classNamePrefix="select"
                            onChange={ handleChangeVisibilidad }
                            onBlur={ handleBlurVisibilidad }
                            styles={{ control: base => ({ ...base, ...controlStylesValidation(Visibilidad.state === 2, Visibilidad.state === 1) }) }}
                        />
                    </Form.Group>
                </Col>
                <Col sm="4">
                    <Form.Group className="mb-3">
                        <Form.Label>Rol</Form.Label>
                        <Form.Select value={ Rol.value } onChange={ handleChangeRol } isInvalid={ Rol.state == 2 ? true : false } isValid={ Rol.state == 1 ? true : false }>
                            <option>Seleccionar</option>
                            {
                                dataRol.map((item: any, index: number) => 
                                    <option key={ index } value={ item.pkid }>{ item.nombre }</option>
                                )
                            }
                        </Form.Select>
                    </Form.Group>
                </Col>
                <Col sm="4">
                    <Form.Group className="mb-3">
                        <Form.Label>Estado</Form.Label>
                        <Form.Select value={ Estado.value } onChange={ handleChangeEstado } isInvalid={ Estado.state == 2 ? true : false } isValid={ Estado.state == 1 ? true : false }>
                            <option>Seleccionar</option>
                            <option value="ACTIVO">Activo</option>
                            <option value="INACTIVO">Inactivo</option>
                        </Form.Select>
                    </Form.Group>
                </Col>
            </Row>
            <br/>
            <div className="mb-5 text-center">
                <Button variant="primary" onClick={ saveUser } disabled={ !canSave }>Guardar</Button>{' '}
                <Button variant="danger" onClick={ handleClose }>Salir</Button>{' '}
            </div>
            {
                !!confirmSave &&
                    <Confirm show={ confirmSave } handleClose={ handleToggleConfirm } action={ sendData } title='Confirmación de guardado' message='¿Está seguro que desea guardar los datos?'/>
            }
            {
                !!proccessSave &&
                <Proccessing show={ proccessSave } title='Actualizando usuario...' message='No salga de esta página por favor...' />
            }
            {
                !!alertSave &&
                <Alert show={ alertSave } handleClose={ () => setAlertSave(false) } title='Error de actualización' message='La operación no pudo completarse, vuelva a intentarlo con contacte a un administrador' />
            }
        </Form>
    )
}