import { useEffect, useState, useContext } from 'react'
import { Col, Form, Row } from 'react-bootstrap'
import { AuthContext } from '../../providers/authContext'

const PatientForm = ({ data, onEventSave, dataUser, callbackResponse }: { data: any, onEventSave: number, dataUser: any, callbackResponse?: any }) => {

        //#region [ VARIABLES ]

        const { session } = useContext(AuthContext)
        const [statusRow, setStatusRow] = useState(0) //status: 0 is new, 1 is update

        const [TieneAlergias, setTieneAlergias] = useState<any>({ value: '', state: 0, message: ''})
        const [DonacionOrganos, setDonacionOrganos] = useState<any>({ value: '', state: 0, message: ''})
        const [Alergias, setAlergias] = useState<any>({ value: '', state: 0, message: ''})
        const [TipoSangre, setTipoSangre] = useState<any>({ value: '', state: 0, message: ''})
        const [FactorRh, setFactorRh] = useState<any>({ value: '', state: 0, message: ''})
        const [ContactoEmergencia, setContactoEmergencia] = useState<any>({ value: '', state: 0, message: ''})
        const [NumeroEmergencia1, setNumeroEmergencia1] = useState<any>({ value: '', state: 0, message: ''})
        const [NumeroEmergencia2, setNumeroEmergencia2] = useState<any>({ value: '', state: 0, message: ''})

    //#endregion

    //#region [ EFFECTS ]

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

    const loadData = async () => {
        if(!data){
            return
        }
        setStatusRow(1)
        setTieneAlergias({ value: data.TieneAlergias, state: 0, message: '' })
        setDonacionOrganos({ value: data.DonacionOrganos, state: 0, message: '' })
        setAlergias({ value: data.Alergias, state: 0, message: '' })
        setTipoSangre({ value: data.TipoSangre, state: 0, message: '' })
        setFactorRh({ value: data.FactorRh, state: 0, message: '' })
        setContactoEmergencia({ value: data.ContactoEmergencia, state: 0, message: '' })
        setNumeroEmergencia1({ value: data.NumeroEmergencia1, state: 0, message: '' })
        setNumeroEmergencia2({ value: data.NumeroEmergencia2, state: 0, message: '' })
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
                Contacto_Emergencia: ContactoEmergencia.value,
                Numero_Emergencia_1: NumeroEmergencia1.value,
                Numero_Emergencia_2: NumeroEmergencia2.value,
                Tiene_Alergias: TieneAlergias.value,
                Alergias: Alergias.value,
                Tipo_Sangre: TipoSangre.value,
                Factor_Sangre: FactorRh.value,
                Donacion_Organos: DonacionOrganos.value,
            }
        }
        console.log(payload)
        let result: any;
        if(statusRow == 0){
            payload.Item.Creado_Por = session.Id
            //result = await createPatient(payload)
        }
        if (statusRow == 1){
            payload.Item.Id = data.Id
            payload.Item.Actualizado_Por = session.Id
            //result = await updatePatient(payload)
        }
        if(callbackResponse){
            callbackResponse(result)
        }
    }


    //#endregion

    //#region [ EVENTS ]

    const handleChangeTieneAlergias = (event: any) => {
        const _value = event.target.value
        if(!_value){
            setTieneAlergias({ value: TieneAlergias.value, state: 2, message: 'Completa este campo' })
        }
        setTieneAlergias({ value: _value, state: 1, message: '' })
    }

    const handleChangeDonacionOrganos = (event: any) => {
        const _value = event.target.value
        if(!_value){
            setDonacionOrganos({ value: DonacionOrganos.value, state: 2, message: 'Completa este campo' })
        }
        setDonacionOrganos({ value: _value, state: 1, message: '' })
    }

    const handleChangeAlergias = (event: any) => {
        const _value = event.target.value
        if(!_value){
            setAlergias({ value: Alergias.value, state: 2, message: 'Completa este campo' })
        }
        setAlergias({ value: _value, state: 1, message: '' })
    }

    const handleChangeTipoSangre = (event: any) => {
        const _value = event.target.value
        if(!_value){
            setTipoSangre({ value: TipoSangre.value, state: 2, message: 'Completa este campo' })
        }
        setTipoSangre({ value: _value, state: 1, message: '' })
    }

    const handleChangeFactorRh = (event: any) => {
        const _value = event.target.value
        if(!_value){
            setFactorRh({ value: FactorRh.value, state: 2, message: 'Completa este campo' })
        }
        setFactorRh({ value: _value, state: 1, message: '' })
    }

    const handleChangeContactoEmergencia = (event: any) => {
        const _value = event.target.value
        if(!_value){
            setContactoEmergencia({ value: ContactoEmergencia.value, state: 2, message: 'Completa este campo' })
        }
        setContactoEmergencia({ value: _value, state: 1, message: '' })
    }

    const handleChangeNumeroEmergencia1 = (event: any) => {
        const _value = event.target.value
        if(!_value){
            setNumeroEmergencia1({ value: NumeroEmergencia1.value, state: 2, message: 'Completa este campo' })
        }
        setNumeroEmergencia1({ value: _value, state: 1, message: '' })
    }

    const handleChangeNumeroEmergencia2 = (event: any) => {
        const _value = event.target.value
        if(!_value){
            setNumeroEmergencia2({ value: NumeroEmergencia2.value, state: 2, message: 'Completa este campo' })
        }
        setNumeroEmergencia2({ value: _value, state: 1, message: '' })
    }

    //#endregion

    //#region [ RENDER ]


        return (
            <Form>
                <Row>
                    <Col sm="6">
                        <Form.Group className="mb-3">
                            <Form.Label>Tiene alergias</Form.Label>
                            <Form.Select onChange={ handleChangeTieneAlergias } value={ TieneAlergias.value }>
                                <option>Seleccionar</option>
                                <option value="Si">Si</option>
                                <option value="No">No</option>
                            </Form.Select>
                        </Form.Group>
                    </Col>
                    <Col sm="6">
                        <Form.Group className="mb-3">
                            <Form.Label>Donación de órganos</Form.Label>
                            <Form.Select onChange={ handleChangeDonacionOrganos } value={ DonacionOrganos.value }>
                                <option>Seleccionar</option>
                                <option value="Si">Si</option>
                                <option value="No">No</option>
                            </Form.Select>
                        </Form.Group>
                    </Col>
                </Row>

                <Form.Group className="mb-3">
                    <Form.Label>Alergias</Form.Label>
                    <Form.Control type="text" placeholder="Escriba todas sus alergias"  onChange={ handleChangeAlergias } value={ Alergias.value }/>
                </Form.Group>

                <Row>
                    <Col sm="6">
                        <Form.Group className="mb-3">
                            <Form.Label>Tipo de sangre</Form.Label>
                            <Form.Select onChange={ handleChangeTipoSangre } value={ TipoSangre.value }>
                                <option>Seleccionar</option>
                                <option value="A">A</option>
                                <option value="B">B</option>
                                <option value="AB">AB</option>
                                <option value="O">O</option>
                            </Form.Select>
                        </Form.Group>
                    </Col>
                    <Col sm="6">
                        <Form.Group className="mb-3">
                            <Form.Label>Factor RH</Form.Label>
                            <Form.Select onChange={ handleChangeFactorRh } value={ FactorRh.value }>
                                <option>Seleccionar</option>
                                <option value="+">+</option>
                                <option value="-">-</option>
                            </Form.Select>
                        </Form.Group>
                    </Col>
                </Row>

                <Form.Group className="mb-3">
                    <Form.Label>Contacto de emergencia</Form.Label>
                    <Form.Control type="text" placeholder="Nombres y apellidos de la persona"  onChange={ handleChangeContactoEmergencia } value={ ContactoEmergencia.value }/>
                </Form.Group>

                <Row>
                    <Col sm="6">
                        <Form.Group className="mb-3">
                            <Form.Label>Numero de emergencia 1</Form.Label>
                            <Form.Control type="text" placeholder="Ingrese un número de algún familiar"  onChange={ handleChangeNumeroEmergencia1 } value={ NumeroEmergencia1.value }/>
                        </Form.Group>
                    </Col>
                    <Col sm="6">
                        <Form.Group className="mb-3">
                            <Form.Label>Numero de emergencia 2</Form.Label>
                            <Form.Control type="text" placeholder="Ingrese un número de algún familiar"  onChange={ handleChangeNumeroEmergencia2 } value={ NumeroEmergencia2.value }/>
                        </Form.Group>
                    </Col>
                </Row>

            </Form>
        )

    //#endregion
}

export default PatientForm