import { useEffect, useState, useContext, Fragment } from 'react'
import { Col, Form, Row } from 'react-bootstrap'
import { AuthContext } from 'providers/authContext'
import { savePatient, updatePatient } from 'services/patientService'
import { Loading } from 'components/alerts/loading'

export const PatientForm = ({ data, onEventSave, dataUser, callbackResponse }: { data: any, onEventSave: number, dataUser: any, callbackResponse?: any }) => {

        //#region [ VARIABLES ]

        const { session } = useContext(AuthContext)
        const [loading, setLoading] = useState(false)

        const [TieneAlergias, setTieneAlergias] = useState<any>({ value: 'Seleccionar', state: 0, message: ''})
        const [DonacionOrganos, setDonacionOrganos] = useState<any>({ value: 'Seleccionar', state: 0, message: ''})
        const [Alergias, setAlergias] = useState<any>({ value: '', state: 0, message: ''})
        const [TipoSangre, setTipoSangre] = useState<any>({ value: 'Seleccionar', state: 0, message: ''})
        const [FactorRh, setFactorRh] = useState<any>({ value: 'Seleccionar', state: 0, message: ''})
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
        if(!data || data == ''){
            return
        }
        setTieneAlergias({ value: data.Tiene_Alergias, state: 0, message: '' })
        setDonacionOrganos({ value: data.Donacion_Organos, state: 0, message: '' })
        setAlergias({ value: data.Alergias, state: 0, message: '' })
        setTipoSangre({ value: data.Tipo_Sangre, state: 0, message: '' })
        setFactorRh({ value: data.Factor_Sangre, state: 0, message: '' })
        setContactoEmergencia({ value: data.Contacto_Emergencia, state: 0, message: '' })
        setNumeroEmergencia1({ value: data.Numero_Emergencia_1, state: 0, message: '' })
        setNumeroEmergencia2({ value: data.Numero_Emergencia_2, state: 0, message: '' })
    }

    //default method to init
    const save = async() => {

        if(
            TieneAlergias.value == 'Seleccionar' ||
            DonacionOrganos.value == 'Seleccionar' ||
            TipoSangre.value == 'Seleccionar' ||
            FactorRh.value == 'Seleccionar' ||
            ContactoEmergencia.value == '' ||
            NumeroEmergencia1.value == ''
        ){
            return
        }
        sendData()
    }

    const sendData = async() => {
        const payload: any = {
            Id_Usuario: dataUser.Id,
            Contacto_Emergencia: ContactoEmergencia.value,
            Numero_Emergencia_1: NumeroEmergencia1.value,
            Numero_Emergencia_2: NumeroEmergencia2.value,
            Tiene_Alergias: TieneAlergias.value,
            Alergias: Alergias.value,
            Tipo_Sangre: TipoSangre.value,
            Factor_Sangre: FactorRh.value,
            Donacion_Organos: DonacionOrganos.value
        }
        let result: any;
        setLoading(true)
        if(!data){
            payload.Creado_Por = session.Id
            result = await savePatient(payload)
        }
        else{
            payload.Id = data.Id
            payload.Actualizado_Por = session.Id
            result = await updatePatient(payload)
        }
        setLoading(false)
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
            <Fragment>
                <Form>
                    <Row>
                        <Col sm="6">
                            <Form.Group className="mb-3">
                                <Form.Label>Tiene alergias</Form.Label>
                                <Form.Select isInvalid={ TieneAlergias.value == 'Seleccionar' ? true : false } isValid={ TieneAlergias.value != 'Seleccionar' ? true : false } onChange={ handleChangeTieneAlergias } value={ TieneAlergias.value }>
                                    <option>Seleccionar</option>
                                    <option value={1}>Si</option>
                                    <option value={0}>No</option>
                                </Form.Select>
                            </Form.Group>
                        </Col>
                        <Col sm="6">
                            <Form.Group className="mb-3">
                                <Form.Label>Donación de órganos</Form.Label>
                                <Form.Select isInvalid={ DonacionOrganos.value == 'Seleccionar' ? true : false } isValid={ DonacionOrganos.value != 'Seleccionar' ? true : false } onChange={ handleChangeDonacionOrganos } value={ DonacionOrganos.value }>
                                    <option>Seleccionar</option>
                                    <option value={1}>Si</option>
                                    <option value={0}>No</option>
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
                                <Form.Select isInvalid={ TipoSangre.value == 'Seleccionar' ? true : false } isValid={ TipoSangre.value != 'Seleccionar' ? true : false } onChange={ handleChangeTipoSangre } value={ TipoSangre.value }>
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
                                <Form.Select isInvalid={ FactorRh.value == 'Seleccionar' ? true : false } isValid={ FactorRh.value != 'Seleccionar' ? true : false } onChange={ handleChangeFactorRh } value={ FactorRh.value }>
                                    <option>Seleccionar</option>
                                    <option value="+">+</option>
                                    <option value="-">-</option>
                                </Form.Select>
                            </Form.Group>
                        </Col>
                    </Row>

                    <Form.Group className="mb-3">
                        <Form.Label>Contacto de emergencia</Form.Label>
                        <Form.Control isInvalid={ ContactoEmergencia.value == '' ? true : false } isValid={ ContactoEmergencia.value != '' ? true : false } type="text" placeholder="Nombres y apellidos de la persona"  onChange={ handleChangeContactoEmergencia } value={ ContactoEmergencia.value }/>
                    </Form.Group>

                    <Row>
                        <Col sm="6">
                            <Form.Group className="mb-3">
                                <Form.Label>Numero de emergencia 1</Form.Label>
                                <Form.Control isInvalid={ NumeroEmergencia1.value == '' ? true : false } isValid={ NumeroEmergencia1.value != '' ? true : false } type="text" placeholder="Ingrese un número de algún familiar"  onChange={ handleChangeNumeroEmergencia1 } value={ NumeroEmergencia1.value }/>
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
                {
                    !!loading &&
                    <Loading show={ loading } />
                }
            </Fragment>
        )

    //#endregion
}