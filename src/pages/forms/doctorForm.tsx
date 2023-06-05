import { useEffect, useState, useContext } from 'react'
import { Col, Form, Row } from 'react-bootstrap'
import { specialtyService } from '../../services/specialtyService'
import { AuthContext } from '../../providers/authContext'

const DoctorForm = ({ data, onEventSave, dataUser, callbackResponse }: { data: any, onEventSave: number, dataUser: any, callbackResponse?: any }) => {

    //#region [ VARIABLES ]

        const { session } = useContext(AuthContext)
        const [specialties, setSpecialties] = useState<[]>([])
        const [statusRow, setStatusRow] = useState(0) //status: 0 is new, 1 is update

        const [Cmp, setCmp] = useState<any>({ value: '', state: 0, message: ''})
        const [Especialidad, setEspecialidad] = useState<any>({ value: '', state: 0, message: ''})
        const [Grado, setGrado] = useState<any>({ value: '', state: 0, message: ''})

    //#endregion

    //#region [ EFFECTS ]

    useEffect(() => {
        loadSpecialty()
      }, [])


    useEffect(() => {
        loadData()
      }, [data])

      useEffect(() => {
        if(onEventSave != 0){
            save()
        }
      }, [onEventSave])

    //#endregion

    //#region [ METHODS ]

        const loadSpecialty = async () => {
            const result: any = await specialtyService() || []
            setSpecialties(result)
        }

        const loadData = async () => {
            if(!data){
                return
            }
            setStatusRow(1)
            setCmp({ value: data.CMP, state: 0, message: '' })
            setEspecialidad({ value: data.Especialidad, state: 0, message: '' })
            setGrado({ value: data.Grado, state: 0, message: '' })
        }

        //default method to init
        const save = async() => {
            //verify the form
            sendData()
        }

        const sendData = async() => {
            const payload: any = {
                Item: {
                    Id_Usuario: dataUser.Id,
                    Codigo: Cmp.value,
                    Id_Especialidad: Especialidad.value,
                    Grado_Instruccion: Grado.value
                }
            }
            console.log(payload)
            let result: any;
            if(statusRow == 0){
                payload.Item.Creado_Por = session.Id
                //result = await createDoctor(payload)
            }
            if (statusRow == 1){
                payload.Item.Id = data.Id
                payload.Item.Actualizado_Por = session.Id
                //result = await updateDoctor(payload)
            }
            if(callbackResponse){
                callbackResponse(result)
            }
        }

    //#endregion

    //#region [ EVENTS ]

    const handleChangeCmp = (event: any) => {
        const _value = event.target.value
        if(!_value){
            setCmp({ value: Cmp.value, state: 2, message: 'Completa este campo' })
        }
        setCmp({ value: _value, state: 1, message: '' })
    }

    const handleChangeEspecialidad = (event: any) => {
        const _value = event.target.value
        if(!_value){
            setEspecialidad({ value: Especialidad.value, state: 2, message: 'Completa este campo' })
        }
        setEspecialidad({ value: _value, state: 1, message: '' })
    }

    const handleChangeGrado = (event: any) => {
        const _value = event.target.value
        if(!_value){
            setGrado({ value: Grado.value, state: 2, message: 'Completa este campo' })
        }
        setGrado({ value: _value, state: 1, message: '' })
    }

    //#endregion

    //#region [ RENDER ]

        return (
            <Form>
            <Row>
                <Col sm="6">
                    <Form.Group className="mb-3">
                        <Form.Label>CMP</Form.Label>
                        <Form.Control type="text" placeholder="Colegio de Médicos del Perú" onChange={ handleChangeCmp } value={ Cmp.value }/>
                    </Form.Group>
                </Col>
                <Col sm="6">
                    <Form.Group className="mb-3">
                        <Form.Label>Especialidad</Form.Label>
                        <Form.Select onChange={ handleChangeEspecialidad } value={ Especialidad.value }>
                            <option>Seleccionar</option>
                            {
                                specialties.map((item: any, index: number) =>
                                    <option key={ index } value={ item.Id }>{ item.Nombre }</option>
                                )
                            }
                        </Form.Select>
                    </Form.Group>
                </Col>
            </Row>

            <Form.Group className="mb-3">
                <Form.Label>Grado de instrucción</Form.Label>
                <Form.Control type="text" placeholder="Bachiller, Magister, Doctor" onChange={ handleChangeGrado } value={ Grado.value }/>
            </Form.Group>
        </Form>
        )

  //#endregion
}

export default DoctorForm