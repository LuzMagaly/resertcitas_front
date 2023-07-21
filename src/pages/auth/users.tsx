import { Fragment, useEffect, useState } from 'react'
import { Table, Container, Button } from 'react-bootstrap'
import { UserModal } from 'pages/auth/userModal'
//import { deleteUser, getAllUser, updateStateUser } from '../services/userService'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBan, faCheck, faPen, faTimes } from '@fortawesome/free-solid-svg-icons'
import { Confirm } from 'components/alerts/confirm'
import { Proccessing } from 'components/alerts/proccessing'
import { Alert } from 'components/alerts/alert'
import { getUserAllShort } from 'services/userService'
import { getRolesAll } from 'services/permisionRolService'

const Users = () => {

  const [show, setShow] = useState(false)
  const [activeRow, setActiveRow] = useState<any>(null)
  const [rows, setRows] = useState<any[]>([])
  const [roles, setRoles] = useState<any[]>([])
  const [confirmUpdate, setConfirmUpdate] = useState<boolean>(false)
  const [proccessUpdate, setProccessUpdate] = useState<boolean>(false)
  const [alertUpdate, setAlertUpdate] = useState<boolean>(false)

  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  useEffect(() => {
    getRoles()
  }, [])

  const getRoles = async () => {
    const result: any = await getRolesAll()
    if(result && result.length && result.length > 0){
      setRoles(result)
    }
    getRows()
  }

  const getRows = async () => {
    const result: any = await getUserAllShort()
    if(result && result.length && result.length > 0){
      setRows(result)
    }
  }

  const editRow = (item: any) => {
    setActiveRow(item)
    handleShow()
  }

  return (
    <Fragment>
      <Container fluid>
        <div className="d-flex mt-2">
          <div className="me-auto p-0">
            <h1>Usuarios</h1>
          </div>
        </div>
        <div style={{ maxHeight: '10vh' }}>
          <Table responsive className="table table-bordered table-striped table-hover" style={{ overflowX: 'auto', display: 'block', height: '75vh' }}>
            <thead>
              <tr className="align-middle" style={{ textAlign: 'center' }}>
                <th>ID</th>
                <th>¿Es médico?</th>
                <th>¿Es paciente?</th>
                <th>DNI</th>
                <th>Nombres</th>
                <th>Apellido P</th>
                <th>Apellido M</th>
                <th>Rol</th>
                <th>Estado</th>
                <th>Opciones</th>
              </tr>
            </thead>
            <tbody>
              {
                rows.map((item: any, index: number) => 
                  <tr key={ index }>
                    <td className="text-center">{ item.Id }</td>
                    <td className="text-center">{ (item.Medicos_Medicos_Id_UsuarioToUsuarios && item.Medicos_Medicos_Id_UsuarioToUsuarios.Id) ? 'SI' : 'NO' }</td>
                    <td className="text-center">{ (item.Pacientes_Pacientes_Id_UsuarioToUsuarios && item.Pacientes_Pacientes_Id_UsuarioToUsuarios.Id) ? 'SI' : 'NO' }</td>
                    <td className="text-center">{ item.DNI }</td>
                    <td className="text-center">{ item.Nombres }</td>
                    <td className="text-center">{ item.Apellido_Paterno }</td>
                    <td className="text-center">{ item.Apellido_Materno }</td>
                    <td className="text-center">{ item.Roles.Nombre }</td>
                    <td className="text-center">{ item.Estado }</td>
                    <td className="text-center">
                      <span>
                          <Button className="mb-2" variant='success' onClick={ () => editRow(item) }><FontAwesomeIcon icon={ faPen }/> Editar</Button>
                      </span>
                    </td>
                  </tr>
                )
              }
            </tbody>
          </Table>
        </div>
      </Container>
      {
        !!show && <UserModal show={ show } handleClose={ handleClose } value={ activeRow } getAllRows={ getRows } dataList={ roles }/>
      }
    </Fragment>
  )

}

export default Users