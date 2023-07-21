import { useState, useEffect } from 'react' //noesreactivo,
import { Col, Form, Row, Button } from 'react-bootstrap'
import { Confirm } from "components/alerts/confirm"
//import { createUser, existsUsername } from '../../services/userService'
import { updateRol, updateUser } from '../../services/userService'
import { Proccessing } from 'components/alerts/proccessing'
import { Alert } from 'components/alerts/alert'
import Select from 'react-select';

export const UserForm = ({ data, handleClose, dataRol, updateRows }: { data: any, handleClose: any, dataRol: any, updateRows: any }) => {

    //#region [ VARIABLES ]

        const [confirmSave, setConfirmSave] = useState(false)
        const [proccessSave, setProccessSave] = useState(false)
        const [alertSave, setAlertSave] = useState(false)

        const [Rol, setRol] = useState<any>({ value: '3', state: 1, message: '' })
        const [Estado, setEstado] = useState<any>({ value: 'ACTIVO', state: 1, message: '' })

    //#endregion

    //#region [ EFFECTS ]

        useEffect(() => {
            loadData()
        }, [data])

    //#endregion

    //#region [ METHODS ]

        const loadData = () => {
            if(!data){
                return
            }
            setRol({ value: data.Id_Rol, state: 1, message: '' })
            setEstado({ value: data.Estado, state: 1, message: '' })
        }

        const saveUser = async() => {
            if(
                Rol.value == 'Seleccionar' ||
                Estado.value == 'Seleccionar'){
                return
            }
            handleToggleConfirm()
        }

        const sendData = async() => {
            handleToggleConfirm()

            const payload: any = {
                Item:{
                    "Id": data.Id,
                    "Rol": Rol.value,
                    "Estado": Estado.value,
                }
            }
            const result = await updateRol(payload)
            setProccessSave(false)
            if(result){
                updateRows()
                handleClose()
            }
            else{
                setAlertSave(true)
            }
        }

    //#endregion

    //#region [ EVENTS ]

        const handleToggleConfirm = () => {
            setConfirmSave(!confirmSave)
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


    //#endregion

    return (
        <Form>
            <Row>
                <Col sm="12">
                    <Form.Group className="mb-3" >
                        <Form.Label>Nombres</Form.Label>
                        <Form.Control value={ data.Nombres } type="text" disabled />
                    </Form.Group>
                </Col>
            </Row>
            <Row>
                <Col sm="6">
                    <Form.Group className="mb-3">
                        <Form.Label>Apellido paterno</Form.Label>
                        <Form.Control value={ data.Apellido_Paterno } type="text" disabled/>
                    </Form.Group>
                </Col>
                <Col sm="6">
                    <Form.Group className="mb-3">
                        <Form.Label>Apellido materno</Form.Label>
                        <Form.Control value={ data.Apellido_Materno } type="text" disabled/>
                    </Form.Group>
                </Col>
            </Row>

            <Row>
                <Col sm="4">
                    <Form.Group className="mb-3">
                        <Form.Label>Rol</Form.Label>
                        <Form.Select value={ Rol.value } onChange={ handleChangeRol } isInvalid={ Rol.state == 2 ? true : false } isValid={ Rol.state == 1 ? true : false }>
                            <option>Seleccionar</option>
                            {
                                dataRol.map((item: any, index: number) =>
                                    <option key={ index } value={ item.Id }>{ item.Nombre }</option>
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
                <Button variant="primary" onClick={ saveUser }>Guardar</Button>{' '}
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