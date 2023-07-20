//#region [ IMPORTS ]

  import { Fragment, useState, useEffect, useContext } from "react"
  import { faPen, faBan, faCheck, faTimes } from "@fortawesome/free-solid-svg-icons"
  import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
  import { Container, Button, Table, Col, Form, Row } from "react-bootstrap"
  import { Confirm } from "components/alerts/confirm"
  import { Proccessing } from "components/alerts/proccessing"
  import { PermisionModal } from "pages/auth/permisionModal"
  //import { deleteRol, getPermiso, getRol } from "../services/permisionService"
  import { Alert } from "components/alerts/alert"
import { getSpecialtyAll } from "services/specialtyService"
import { getScheduleBySpecialty } from "services/scheduleService"
import { getAppointmentBySpecialty, updateStateAppointment } from "services/appointmentService"
import { AuthContext } from "providers/authContext"
import CreateAppointment from "./createAppointment"

//#endregion

export const Appointment = () => {

  const { session } = useContext(AuthContext)
  const [listSpecialties, setListSpecialties] = useState<any[]>([])
  const [currentDate, setCurrentDate] = useState<string>(new Date().toLocaleString('en-us', {year: 'numeric', month: '2-digit', day: '2-digit'}).replace(/(\d+)\/(\d+)\/(\d+)/, '$3-$1-$2'))
  const [selectedSpecialty, setSelectedSpecialty] = useState<any>(0)

  const [rows, setRows] = useState<any[]>([])
  const [activeRow, setActiveRow] = useState<any>(null)
  const [show, setShow] = useState(false)

  const [loading, setLoading] = useState(false)
  const [confirm, setConfirm] = useState({ state: false, title: '', message: '' })
  const [alert, setAlert] = useState({ state: false, title: '', message: '' })

  useEffect(() => {
    getAllSpecialties()
  }, [])

  useEffect(() => {
    if(listSpecialties && listSpecialties.length && listSpecialties.length > 0){
      getRows()
    }
  }, [listSpecialties, currentDate, selectedSpecialty])

  const getAllSpecialties = async () => {
    setLoading(true)
    const result = await getSpecialtyAll()
    if(result && result.length && result.length > 0){
      result.splice(0, 1)
      setListSpecialties(result)
    }
  }

  const getRows = async () => {
    const id_specialty: number[] = selectedSpecialty != 0 ? [parseInt(selectedSpecialty)] : listSpecialties.map((item: any) => item.Id)
    const date = new Date(currentDate)
    const payload = {
      Id: id_specialty,
      Fecha: date,
      Estado: selectState()
    }
    setLoading(true)
    const result = await getAppointmentBySpecialty(payload)
    setLoading(false)
    if(result && result.length && result.length > 0){
      setRows(result)
    }
    else{
      setRows([])
    }
  }

  const selectState = () => {
    return ['PENDIENTE', 'APROBADO', 'ANULADO', 'ASISTENCIA', 'INASISTENCIA']
  }

  const newRow = () => {
    handleShow()
    setActiveRow(null)
  }

  const changeStateRow = (id: number, operation: number,  title: string, message: string) => {
    const item = {
      Id: id,
      Actualizado_Por: session.Id,
      Estado: ''
    }
    setActiveRow(item)
    setConfirm({ state: true, title: title, message: message })
    switch (operation) {
      case 1:
        item.Estado = 'APROBADO'
        //Aprobacion
      break;
        case 2:
        item.Estado = 'ANULADO'
        //Anulacion
        break;
      case 3:
        item.Estado = 'ASISTENCIA'
        //Asistencia
        break;
      case 4:
        item.Estado = 'INASISTENCIA'
        //Inasistencia
        break;

      default:
        break;
    }
    
  }

  const changeStateFromDatabase = async () => {
    setConfirm({ state: false, title: '', message: '' })
    setLoading(true)
    const result: any = await updateStateAppointment(activeRow)
    setLoading(false)
    if(result){
        getRows()
    }
    else{
        setAlert({ state: true, title: '', message: '' })
    }
  }

  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  const handleChangeDate = (event: any) => {
    setCurrentDate(event.target.value)
  }

  const handleChangeSpecialty = (event: any) => {
    const value = event.target.value
    if(value){
      setSelectedSpecialty(value)
    }
  }

  const getHours = (value: string): string => {
    const date = new Date(value)
    return `${ date.getHours() < 10 ? '0' : '' }${ date.getHours() }:${ date.getMinutes() < 10 ? '0' : '' }${ date.getMinutes() }`
  }

  const getDates = (value: string) => {
      const date = new Date(value)
      return `${ date.getDate() < 10 ? '0' : '' }${ date.getDate() }/${ date.getMonth() + 1 < 10 ? '0' : '' }${ date.getMonth() + 1 }/${ date.getFullYear() }`
  }

  return (
    <Fragment>
      <Container fluid>
        <div className="d-flex mt-2">
          <div className="me-auto">
            <h2>Administración de citas</h2>
          </div>
          <div className="p-2">
            <Button variant="primary" onClick={ newRow }>Nuevo</Button>{' '}
          </div>
        </div>
        <Form>
            <Row>
              <Col sm="3">
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                  <Form.Label>Especialidad</Form.Label>
                  <Form.Select value={ selectedSpecialty } onChange={ handleChangeSpecialty }>
                    <option value={ 0 }>Todos</option>
                    {
                      listSpecialties.map((item: any, index: number) =>
                        <option key={ index } value={ item.Id }>{ item.Nombre }</option>
                      )
                    }
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col sm="2">
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                  <Form.Label>Fecha</Form.Label>
                  <Form.Control type="date" value={ currentDate } onChange={ handleChangeDate } />
                </Form.Group>
              </Col>
            </Row><hr/>
          </Form>
        <div style={{ maxHeight: '10vh' }}>
          <Table responsive className="table table-bordered table-striped table-hover" style={{ overflowX: 'auto', overflowY: 'auto', display: 'block', height: '75vh' }}>
            <thead>
              <tr className="align-middle" style={{ textAlign: 'center' }}>
                <th>ID</th>
                <th>DNI</th>
                <th>Paciente</th>
                <th>Fecha</th>
                <th>Hora</th>
                <th>Turno</th>
                <th>Especialidad</th>
                <th>Consultorio</th>
                <th>Medico</th>
                <th>Estado</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {
                rows.map((item: any, index: number) => (
                  <tr key={ index }>
                    <td className="text-center">{ item.Id }</td>
                    <td className="text-center">{ item.Pacientes.Usuarios_Pacientes_Id_UsuarioToUsuarios.DNI }</td>
                    <td className="text-center">{ `${ item.Pacientes.Usuarios_Pacientes_Id_UsuarioToUsuarios.Nombres } ${ item.Pacientes.Usuarios_Pacientes_Id_UsuarioToUsuarios.Apellido_Paterno } ${ item.Pacientes.Usuarios_Pacientes_Id_UsuarioToUsuarios.Apellido_Materno}` }</td>

                    <td className="text-center">{ getDates(item.AgendaCalendario.Fecha) }</td>
                    <td className="text-center">{ getHours(item.AgendaCalendario.Hora_Inicio) }</td>
                    <td className="text-center">{ item.AgendaCalendario.Turno }</td>
                    <td className="text-center">{ item.AgendaCalendario.Medicos.Especialidades.Nombre }</td>
                    <td className="text-center">{ item.AgendaCalendario.Consultorios.Nombre }</td>
                    <td className="text-center">{ `${ item.AgendaCalendario.Medicos.Usuarios_Medicos_Id_UsuarioToUsuarios.Nombres } ${ item.AgendaCalendario.Medicos.Usuarios_Medicos_Id_UsuarioToUsuarios.Apellido_Paterno }` }</td>
                    <td className="text-center">{ item.Estado }</td>


                    <td className="text-center">
                      <span>
                        <Button className="mb-2" variant='success' onClick={ () => changeStateRow(item.Id, 1, 'Aprobación de citas', '¿Deseas aprobar esta cita?') }><FontAwesomeIcon icon={ faPen }/> Aprobar pago</Button>{ ' ' }
                        <Button className="mb-2" variant='danger' onClick={ () => changeStateRow(item.Id, 2, 'Anulación de citas', '¿Deseas anular esta cita? Esta operación no se puede revertir') }><FontAwesomeIcon icon={ faPen }/> Anular</Button>{ ' ' }
                        <Button className="mb-2" variant='primary' onClick={ () => changeStateRow(item.Id, 3, 'Atención de paciente', '¿Desea marcar como atendido al paciente?') }><FontAwesomeIcon icon={ faPen }/> Atender</Button>{ ' ' }
                        <Button className="mb-2" variant='dark' onClick={ () => changeStateRow(item.Id, 4, 'Atención de paciente', '¿Desea marcar como inasistencia al paciete? Esta operación no se puede revertir') }><FontAwesomeIcon icon={ faPen }/> Marcar inasistencia</Button>{ ' ' }
                      </span>
                    </td>
                  </tr>
                ))
              }
            </tbody>
          </Table>
        </div>
      </Container>
      {
        !!show && 
        <CreateAppointment show={ show } handleClose={ handleClose }/>
      }
      {
        !!confirm.state &&
          <Confirm show={ confirm.state } handleClose={ () => setConfirm({ state: false, title: '', message: '' }) } action={ changeStateFromDatabase } title={ confirm.title } message={ confirm.message }/>
      }
      {
        !!loading &&
          <Proccessing show={ loading } title='Procesando' message='No salga de esta página por favor...' />
      }
      {
        !!alert.state &&
          <Alert show={ alert.state } handleClose={ () => setAlert({ state: false, title: '', message: '' }) } title='Error de eliminación' message='El rol no puede ser eliminado porque tiene usuarios anexados' />
      }
    </Fragment>
  )
}