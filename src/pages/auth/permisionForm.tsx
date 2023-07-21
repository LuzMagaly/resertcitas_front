import { useState, useEffect, useContext } from 'react';
import { Col, Form, Row, Button } from 'react-bootstrap'
import { Confirm } from "components/alerts/confirm"
import { Proccessing } from 'components/alerts/proccessing'
import { Alert } from 'components/alerts/alert'
import Select from 'react-select'
import { AuthContext } from 'providers/authContext';
import { insertPermisionRol } from 'services/permisionRolService';
//import { createRol, updateRol } from '../../services/permisionService'

export const PermisionForm = ({ data, handleClose, dataList, updateRows }: { data: any, handleClose: any, dataList: any[], updateRows: any }) => {

    //#region [ VARIABLES ]

        const { session } = useContext(AuthContext)
        const [confirmSave, setConfirmSave] = useState(false)
        const [proccessSave, setProccessSave] = useState(false)
        const [alertSave, setAlertSave] = useState(false)

        const [permisosSelected, setPermisosSelected] = useState<any>({ value: [], state: 0, message: '' })

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
            setPermisosSelected(loadOptionsSelect(data.RolPermiso))
        }

        const saveRow = async() => {
            handleToggleConfirm()
        }

        const sendData = async() => {
            handleToggleConfirm()
            let itemsPayload: any[] = []

            permisosSelected.map((element: any) => {
                const item = {
                    "Id_Rol": data ? data.Id : 1,
                    "Id_Permiso": element.value,
                    "Creado_Por": session.Id
                }
                itemsPayload.push(item)
            })

            const payload: any = {
                "Items": itemsPayload
            }

            const result = await insertPermisionRol(payload)
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

        const handleChangePermisos = (items: any) => {
            setPermisosSelected(items)
        }

        const loadOptionsSelect = (arrayInn: any) => {
            let arrayTemp: any[] = []
            arrayInn.map((element: any) => {
                const item = {
                    value: element.Id_Permiso,
                    label: showPermision(element.Id_Permiso)
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
                        <Form.Control type="text" disabled value={ data.Nombre }/>
                    </Form.Group>
                </Col>
                <Col sm="6">
                    <Form.Group className="mb-3">
                        <Form.Label>Permisos</Form.Label>
                        <Select
                            value={ permisosSelected }
                            isMulti
                            name="colors"
                            options={ dataList }
                            className="basic-multi-select"
                            classNamePrefix="select"
                            onChange={ handleChangePermisos }
                        />
                    </Form.Group>
                </Col>

            </Row>
            <br/>
            <div className="mb-5 text-center">
                <Button variant="primary" onClick={ saveRow }>Guardar</Button>{' '}
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