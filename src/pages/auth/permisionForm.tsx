import { useState, useEffect } from 'react'
import { Col, Form, Row, Button } from 'react-bootstrap'
import { Confirm } from "components/alerts/confirm"
import { Proccessing } from 'components/alerts/proccessing'
import { Alert } from 'components/alerts/alert'
import Select from 'react-select'
//import { createRol, updateRol } from '../../services/permisionService'

export const PermisionForm = ({ data, handleClose, dataList, updateRows }: { data: any, handleClose: any, dataList: any[], updateRows: any }) => {

    //#region [ VARIABLES ]

        const [confirmSave, setConfirmSave] = useState(false)
        const [proccessSave, setProccessSave] = useState(false)
        const [alertSave, setAlertSave] = useState(false)
        const [canSave, setCanSave] = useState(false)

        const [nombre, setNombre] = useState<any>({ value: '', state: 2, message: 'Campo obigatorio' })
        const [descripcion, setDescripcion] = useState<any>({ value: '', state: 0, message: '' })
        const [permisosSelected, setPermisosSelected] = useState<any>({ value: [], state: 0, message: '' })

    //#endregion

    //#region [ EFFECTS ]

        useEffect(() => {
            loadData()
        }, [data])

        useEffect(() => {
            validateFields()
        }, [nombre, descripcion])

    //#endregion

    //#region [ METHODS ]

        const loadData = () => {
            if(!data){
                return
            }
            setNombre({ value: data.nombre, state: data.nombre.length > 0 ? 1 : 2, message: 'Campo obligatorio' })
            setDescripcion({ value: data.descripcion, state: 0, message: '' })
            setPermisosSelected({ value: loadOptionsSelect(data.items), state: 0, message: '' })
        }

        const saveRow = async() => {
            if(nombre.state == 2){
                return
            }
            handleToggleConfirm()
        }

        const validateFields = () => {
            let result = false
            if(nombre.state != 2){
                result = true
            }
            setCanSave(result)
        }

        const sendData = async() => {
            handleToggleConfirm()
            let itemsPayload: any[] = []

            permisosSelected.value.map((element: any) => {
                const item = {
                    "iD_Table_1": data ? data.pkid : 0,
                    "iD_Table_2": element.value
                }
                itemsPayload.push(item)
            })

            const payload: any = {
                "pkid": data ? data.pkid : 0,
                "nombre": nombre.value,
                "descripcion": descripcion.value,
                "items": itemsPayload
            }

            let result = null
            if(!data){
                result = null//await createRol(payload)
            }
            else{
                result = null// await updateRol(payload)
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

    //#endregion

    //#region [ EVENTS ]

        const handleToggleConfirm = () => {
            setConfirmSave(!confirmSave)
        }

        const handleChangeDescripcion = (event: any) => {
            const _value = event.target.value
            if(_value && _value != ''){
                setDescripcion({ value: _value, state: 1, message: '' })
            }
            else{
                setDescripcion({ value: _value, state: 2, message: 'Completa este campo' })
            }
        }

        const handleChangeNombre = (event: any) => {
            const _value = event.target.value
            if(_value && _value != ''){
                setNombre({ value: _value, state: 1, message: '' })
            }
            else{
                setNombre({ value: _value, state: 2, message: 'Completa este campo' })
            }
        }

        const handleChangePermisos = (items: any) => {
            setPermisosSelected({ value: items, state: 1, message: '' })
        }

        const controlStylesValidation = (hasError: boolean, hasValid: boolean) => (
            hasValid ? { borderColor: '#198754' } : hasError ? { borderColor: '#dc3545' } : {}
        )

        const loadOptionsSelect = (arrayInn: any) => {
            let arrayTemp: any[] = []
            arrayInn.map((element: any) => {
                const item = {
                    value: element.iD_Table_2,
                    label: showPermision(element.iD_Table_2)
                }
                arrayTemp.push(item)
            })
            return arrayTemp
        }

        const showPermision = (id: number) => {
            const found = dataList.find((item: any) => item.value == id)
            if(found){
              return found.label
            }
            else{
              return 'No definido'
            }
        }

    //#endregion

    return (
        <Form>
            <Row>
                <Col sm="6">
                    <Form.Group className="mb-3" >
                        <Form.Label>Nombre</Form.Label>
                        <Form.Control isInvalid={ nombre.state == 2 ? true : false } isValid={ nombre.state == 1 ? true : false } value={ nombre.value } onChange={ handleChangeNombre } type="text" placeholder="Ingrese sus nombres completos" autoFocus />
                        {
                            nombre.state === 2 &&
                            <Form.Text className="text-danger">
                            { nombre.message }
                            </Form.Text>
                        }
                    </Form.Group>
                </Col>
                <Col sm="6">
                    <Form.Group className="mb-3">
                        <Form.Label>Permisos</Form.Label>
                        <Select
                            value={ permisosSelected.value }
                            isMulti
                            name="colors"
                            options={ dataList }
                            className="basic-multi-select"
                            classNamePrefix="select"
                            onChange={ handleChangePermisos }
                            styles={{ control: (base: any) => ({ ...base, ...controlStylesValidation(permisosSelected.state === 2, permisosSelected.state === 1) }) }}
                        />
                    </Form.Group>
                </Col>

            </Row>
            <Row>
                <Col sm="12">
                    <Form.Group className="mb-3">
                        <Form.Label>Descripcion</Form.Label>
                        <Form.Control isInvalid={ descripcion.state == 2 ? true : false } isValid={ descripcion.state == 1 ? true : false } value={ descripcion.value } onChange={ handleChangeDescripcion } type="text" placeholder="Ingrese la descripcion del rol" />
                        {
                            descripcion.state === 2 &&
                            <Form.Text className="text-danger">
                            { descripcion.message }
                            </Form.Text>
                        }
                    </Form.Group>
                </Col>
            </Row>
            <br/>
            <div className="mb-5 text-center">
                <Button variant="primary" onClick={ saveRow } disabled={ !canSave }>Guardar</Button>{' '}
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