//#region [ IMPORTS ]

  import { Fragment, useState, useEffect } from "react"
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
import { getAppointmentBySpecialty } from "services/appointmentService"

//#endregion

export const Appointment = () => {

  const [listSpecialties, setListSpecialties] = useState<any[]>([])
  const [currentDate, setCurrentDate] = useState<string>(new Date().toLocaleString('en-us', {year: 'numeric', month: '2-digit', day: '2-digit'}).replace(/(\d+)\/(\d+)\/(\d+)/, '$3-$1-$2'))
  const [selectedSpecialty, setSelectedSpecialty] = useState<any>(0)

  const [loading, setLoading] = useState(false)
  const [confirm, setConfirm] = useState(false)


  const [rows, setRows] = useState<any[]>([])
  const [permisions, setPermisions] = useState<any[]>([])
  const [activeRow, setActiveRow] = useState<any>(null)
  const [show, setShow] = useState(false)
  const [confirmUpdate, setConfirmUpdate] = useState<boolean>(false)
  const [proccessUpdate, setProccessUpdate] = useState<boolean>(false)
  const [alertUpdate, setAlertUpdate] = useState<boolean>(false)

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
    console.log(listSpecialties)
    const id_specialty: number[] = selectedSpecialty != 0 ? [parseInt(selectedSpecialty)] : listSpecialties.map((item: any) => item.Id)
    const date = new Date(currentDate)
    const payload = {
      Id: id_specialty,
      Fecha: date
    }
    console.log(payload)
    setLoading(true)
    const result = await getAppointmentBySpecialty(payload)
    console.log(result)
    setLoading(false)
    if(result && result.length && result.length > 0){
      setRows(result)
    }
    else{
      setRows([])
    }
  }


  const getPermisions = async () => {
    const result: any = null//await getPermiso()
    if(result && result.length && result.length > 0){
      setPermisions(result)
    }
    getRows()
  }

  const showPermision = (id: number) => {
    const found = permisions.find((item: any) => item.pkid == id)
    if(found){
      return found.nombre
    }
    else{
      return 'No definido'
    }
  }

  const newRow = () => {
    handleShow()
    setActiveRow(null)
  }

  const editRow = (id: number) => {
    const item = rows.find((_: any) => _.pkid == id)
    if(item){
      setActiveRow(item)
      handleShow()
    }
  }

  const deleteRow = (id: number) => {
    const item = rows.find((_: any) => _.pkid == id)
    if(item){
      setActiveRow(item)
      setConfirmUpdate(item)
    }
  }

  const deleteFromDatabase = async () => {
    setConfirmUpdate(false)
    setProccessUpdate(true)
    //deleting
    const result: any = null// await deleteRol(activeRow.pkid)
    setProccessUpdate(false)
    if(result){
        getRows()
    }
    else{
        setAlertUpdate(true)
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
          <Table responsive className="table table-bordered table-striped table-hover" style={{ overflowX: 'auto', display: 'block', height: '75vh' }}>
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
                        <Button className="mb-2" variant='success' onClick={ () => editRow(item.Id) }><FontAwesomeIcon icon={ faPen }/> Aprobar pago</Button>{ ' ' }
                        <Button className="mb-2" variant='danger' onClick={ () => editRow(item.Id) }><FontAwesomeIcon icon={ faPen }/> Anular</Button>{ ' ' }
                        <Button className="mb-2" variant='primary' onClick={ () => editRow(item.Id) }><FontAwesomeIcon icon={ faPen }/> Atender</Button>{ ' ' }
                        <Button className="mb-2" variant='dark' onClick={ () => editRow(item.Id) }><FontAwesomeIcon icon={ faPen }/> Marcar inasistencia</Button>{ ' ' }
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
        !!show && <PermisionModal show={ show } handleClose={ handleClose } value={ activeRow } getAllRows={ getRows } dataList={ permisions }/>
      }
      {
        confirmUpdate &&
          <Confirm show={ confirmUpdate } handleClose={ () => setConfirmUpdate(false) } action={ deleteFromDatabase } title='Confirmación de eliminación' message={ `¿Está seguro de eliminar este Rol? No podrá deshacer los cambios` }/>
      }
      {
        !!proccessUpdate &&
          <Proccessing show={ proccessUpdate } title='Procesando' message='No salga de esta página por favor...' />
      }
      {
        !!alertUpdate &&
          <Alert show={ alertUpdate } handleClose={ () => setAlertUpdate(false) } title='Error de eliminación' message='El rol no puede ser eliminado porque tiene usuarios anexados' />
      }
    </Fragment>
  )
}