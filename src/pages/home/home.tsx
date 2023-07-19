import { Fragment, useContext, useEffect, useState } from 'react'
import { Container, Button, Card, Col, Row } from 'react-bootstrap'
import { ShowAppointmentsGeneral } from './showAppointmentsGeneral'
import { updateStateAppointment, getAppointmentByPatient, updateAppointment } from 'services/appointmentService'
import { AuthContext } from 'providers/authContext'
import { Confirm } from 'components/alerts/confirm'
import { Proccessing } from 'components/alerts/proccessing'

export const Home = () => {

  const { session } = useContext(AuthContext)
  const [access, setAccess] = useState<boolean>(false)
  const [rows, setRows] = useState<any[]>([])
  const [anulateRow, setAnulateRow] = useState<any>(null)
  const [confirm, setConfirm] = useState<boolean>(false)
  const [proccessing, setProccessing] = useState<boolean>(false)

  useEffect(() => {
    console.log(session)
    if(session && session.Pacientes_Pacientes_Id_UsuarioToUsuarios && session.Pacientes_Pacientes_Id_UsuarioToUsuarios.Id){
      setAccess(true)
    }
    else{
      return
    }
    getMyAppointments()
  }, [])

  const getMyAppointments = async () => {
    const result = await getAppointmentByPatient(session.Pacientes_Pacientes_Id_UsuarioToUsuarios.Id)
    if(result && result.length && result.length > 0){
      setRows(result)
    }
    else{
      setRows([])
    }
    console.log(result)
  }

  const getHours = (value: string): string => {
    const date = new Date(value)
    return `${ date.getHours() < 10 ? '0' : '' }${ date.getHours() }:${ date.getMinutes() < 10 ? '0' : '' }${ date.getMinutes() }`
  }

  const getDates = (value: string) => {
    const date = new Date(value)
    return `${ date.getDate() < 10 ? '0' : '' }${ date.getDate() }/${ date.getMonth() + 1 < 10 ? '0' : '' }${ date.getMonth() + 1 }/${ date.getFullYear() }`
  }

  const anulateAppointment = (id: any) => {
    const item = {
      Id: id,
      Actualizado_Por: session.Id,
      Estado: 'ANULADO'
    }
    setAnulateRow(item)
    setConfirm(true)
  }

  const anulateRowFromDatabase = async () => {
    setConfirm(false)
    setProccessing(true)
    if(anulateRow){
      await anulateAppointment(anulateRow)
    }
    setProccessing(false)
  }

  return (
    <Fragment>
      {
        !!access ?
        <Fragment>
          <ShowAppointmentsGeneral /><br/>
          <Container fluid>
            <div className="d-flex bd-highlight mb-0">
              <div className="me-auto p-0 bd-highlight">
                <h1>Mis citas</h1>
              </div>
              <div className="p-0 bd-highlight">
              </div>
            </div>
            <hr/>
            <div>
              <Row>
                {
                  rows.map((value: any, index: number) =>
                    <Col lg="2" md="3" sm="6" className="mb-4 m-4 p-0" key={ index }>
                        <Card>
                            <Card.Body>
                                <Card.Title>{ `${ value.AgendaCalendario.Consultorios.Nombre }, ${ value.AgendaCalendario.Consultorios.Ubicacion }` }</Card.Title>
                                <Card.Text>{ `${ value.AgendaCalendario.Medicos.Usuarios_Medicos_Id_UsuarioToUsuarios.Nombres } ${ value.AgendaCalendario.Medicos.Usuarios_Medicos_Id_UsuarioToUsuarios.Apellido_Paterno }, ${ value.AgendaCalendario.Medicos.Especialidades.Nombre }` }</Card.Text>
                                <Card.Text>{ `${ getHours(value.AgendaCalendario.Hora_Inicio) } - ${ getHours(value.AgendaCalendario.Hora_Fin) } / Turno ${ value.AgendaCalendario.Turno }` }</Card.Text>
                                <Card.Text>{ `${ getDates(value.AgendaCalendario.Fecha) }` }</Card.Text>
                            </Card.Body>
                            <Button variant="danger" onClick={ () => anulateAppointment(value.Id) }>Anular</Button>
                        </Card>
                    </Col>
                  )
                }
              </Row>
            </div>
          </Container>
          {
            confirm &&
            <Confirm show={ confirm } handleClose={ () => setConfirm(false) } action={ anulateRowFromDatabase } title={'¿Está seguro de anular esta cita?'} message={'Esta operación no se puede revertir'} />
          }
          {
            proccessing &&
            <Proccessing show={ proccessing } title={'Ejecutando operación'} message={'No salgas ni cierres esta página'}/>
          }
        </Fragment>
      :
      <span>Sólo los pacientes pueden visualizar esta página</span>
      }
  </Fragment>
  )
}