import { Fragment, useEffect, useState } from 'react'
import { Table, Container, Button } from 'react-bootstrap'
import { UserModal } from 'pages/auth/userModal'
//import { deleteUser, getAllUser, updateStateUser } from '../services/userService'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBan, faCheck, faPen, faTimes } from '@fortawesome/free-solid-svg-icons'
import { Confirm } from 'components/alerts/confirm'
import { Proccessing } from 'components/alerts/proccessing'
import { Alert } from 'components/alerts/alert'

const Users = () => {
  
  const [show, setShow] = useState(false)
  const [dataIni, setDataIni] = useState([])
  const [activeRow, setActiveRow] = useState<any>(null)
  const [confirmUpdate, setConfirmUpdate] = useState<boolean>(false)
  const [proccessUpdate, setProccessUpdate] = useState<boolean>(false)
  const [alertUpdate, setAlertUpdate] = useState<boolean>(false)
  const [warningDelete, setWarningDelete] = useState<boolean>(false)

  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  useEffect(() => {
    getRows()
  }, [])

  const getRows = async () => {
    const result: any = null //await getAllUser()
    if(result && result.length && result.length > 0){
      setDataIni(result)
    }
  }

  const editRow = (id: number) => {
    const row = dataIni.find((item: any) => item.pkid == id)
    setActiveRow(row)
    handleShow()
  }

  const deleteRow = (id: number) => {
    setActiveRow(id)
    setConfirmUpdate(true)
  }

  const deleteRowFromDatabase = async (id: number) => {
    const result: any = null//await deleteUser(id)
    if(result){
      getRows()
    }
    else{
      setWarningDelete(true)
    }
    setProccessUpdate(false)
  }

  const newRow = () => {
    setActiveRow(null)
    handleShow()
  }

  const changeStateRow = (pkid: number) => {
    const row: any = dataIni.find((item: any) => item.pkid == pkid)
    if(row){
      setActiveRow(row)
      setConfirmUpdate(true)
    }
  }
  
  const updateRow = async () => {
    setConfirmUpdate(false)
    setProccessUpdate(true)

    if(typeof activeRow == "number"){
      deleteRowFromDatabase(activeRow)
    }
    else{
      const row = activeRow
      row.estado = (row.estado == 'ACTIVO') ? 'INACTIVO' : 'ACTIVO'
      row.visibilidad = ''
      const result: any = null//await updateStateUser(row)
      if(result){
        getRows()
      }
      setProccessUpdate(false)
    }
  }

  return (
    <Fragment>
      <Container fluid>
        <div className="d-flex mt-2">
          <div className="me-auto p-0">
            <h1>Usuarios</h1>
          </div>
          <div className="p-2">
            <Button variant="primary" onClick={ newRow }>Nuevo</Button>{' '}
          </div>
        </div>
        <div style={{ maxHeight: '10vh' }}>
          <Table responsive className="table table-bordered table-striped table-hover" style={{ overflowX: 'auto', display: 'block', height: '75vh' }}>
            <thead>
              <tr className="align-middle" style={{ textAlign: 'center' }}>
                <th>ID</th>
                <th>Username</th>
                {/* <th>Correo</th> */}
                <th>Nombres</th>
                {/* <th>Apellido paterno</th> */}
                {/* <th>Apellido materno</th> */}
                <th>Rol</th>
                <th>Estado</th>
                <th>Visibilidad</th>
                <th>Opciones</th>
              </tr>
            </thead>
            <tbody>
              {
                dataIni.map((item: any, index: number) => (
                  <tr key={ index }>
                    <td className="text-center">{ item.pkid }</td>
                    <td className="text-center">{ item.username }</td>
                    {/* <td className="text-center">{ item.correo }</td> */}
                    <td className="text-center">{ item.nombres }</td>
                    {/* <td className="text-center">{ item.apellido_Paterno }</td> */}
                    {/* <td className="text-center">{ item.apellido_Materno }</td> */}
                    <td className="text-center">{ item.rol_Nombre }</td>
                    <td className="text-center">{ item.estado }</td>
                    <td style={{ minWidth: '200px' }}>{ item.visibilidades.map((element: any, i: number) => <span key={ i }>-{ element.nombre }<br/></span>) }</td>
                    <td className="text-center">
                    {
                      item.iD_Rol != 1 &&
                        <span>
                            <Button className="mb-2" variant='success' onClick={ () => editRow(item.pkid) }><FontAwesomeIcon icon={ faPen }/> Editar</Button>{ ' ' }
                            <Button className="mb-2" variant={ item.estado == 'ACTIVO' ? 'danger' : 'primary' } onClick={ () => changeStateRow(item.pkid) }><FontAwesomeIcon icon={ item.estado == 'ACTIVO' ? faBan : faCheck }/> {item.estado == 'ACTIVO' ? 'Desactivar' : 'Activar' }</Button>
                            <Button className="mb-2" variant='dark' onClick={ () => deleteRow(item.pkid) }><FontAwesomeIcon icon={ faTimes }/> Eliminar</Button>
                        </span>
                    }
                    </td>
                  </tr>
                ))
              }
            </tbody>
          </Table>
        </div>
      </Container>
      {
        !!show && <UserModal show={ show } handleClose={ handleClose } value={ activeRow } getAllRows={ getRows }/>
      }
      {
        confirmUpdate &&
          <Confirm show={ confirmUpdate } handleClose={ () => setConfirmUpdate(false) } action={ updateRow } title='Confirmación de operación' message={ `¿Está seguro de realizar esta acción?` }/>
      }
      {
        !!proccessUpdate &&
          <Proccessing show={ proccessUpdate } title='Procesando' message='No salga de esta página por favor...' />
      }
      {
        !!alertUpdate &&
          <Alert show={ alertUpdate } handleClose={ () => setAlertUpdate(false) } title='Error de ejecución' message='La operación no pudo completarse, vuelva a intentarlo con contacte a un administrador' />
      }
      {
        !!warningDelete &&
          <Alert show={ warningDelete } handleClose={ () => setWarningDelete(false) } title='No se completó la operación' message='El usuario no puede ser eliminado porque tiene programaciones asignadas' />
      }
    </Fragment>
  )

}

export default Users