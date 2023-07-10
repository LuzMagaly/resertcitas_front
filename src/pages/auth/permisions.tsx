//#region [ IMPORTS ]

import { Fragment, useState, useEffect } from "react"
import { faPen, faBan, faCheck, faTimes } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Container, Button, Table } from "react-bootstrap"
import { Confirm } from "components/alerts/confirm"
import { Proccessing } from "components/alerts/proccessing"
import { PermisionModal } from "pages/auth/permisionModal"
//import { deleteRol, getPermiso, getRol } from "../services/permisionService"
import { Alert } from "components/alerts/alert"
import { usePermision } from 'hooks/usePermision'

//#endregion

const Permisions = () => {

  const { verify } = usePermision()

  const [rows, setRows] = useState<any[]>([])
  const [permisions, setPermisions] = useState<any[]>([])
  const [activeRow, setActiveRow] = useState<any>(null)
  const [show, setShow] = useState(false)
  const [confirmUpdate, setConfirmUpdate] = useState<boolean>(false)
  const [proccessUpdate, setProccessUpdate] = useState<boolean>(false)
  const [alertUpdate, setAlertUpdate] = useState<boolean>(false)

  useEffect(() => {
    verify(window.location.href)
    getPermisions()
  }, [])

  const getRows = async () => {
    const result: any = null//await getRol()
    if(result && result.length && result.length > 0){
      setRows(result)
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

  return (
    <Fragment>
      <Container fluid>
        <div className="d-flex mt-2">
          <div className="me-auto">
            <h2>Roles y permisos</h2>
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
                <th>Nombre</th>
                <th>Descripcion</th>
                <th>Permisos</th>
                <th>Opciones</th>
              </tr>
            </thead>
            <tbody>
              {
                rows.map((item: any, index: number) => (
                  <tr key={ index }>
                    <td className="text-center">{ item.pkid }</td>
                    <td className="text-center">{ item.nombre }</td>
                    <td className="text-center">{ item.descripcion }</td>
                    <td style={{ minWidth: '200px' }}>{ item.items.map((element: any, i: number) => <span key={ i }>-{ showPermision(element.iD_Table_2) }<br/></span>) }</td>
                    <td className="text-center">
                    <span>
                        <Button className="mb-2" variant='success' onClick={ () => editRow(item.pkid) }><FontAwesomeIcon icon={ faPen }/> Editar</Button>{ ' ' }
                        {
                          item.pkid != 1 &&
                            <Button className="mb-2" variant='danger' onClick={ () => deleteRow(item.pkid) }><FontAwesomeIcon icon={ faTimes }/> Eliminar</Button>
                        }
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

export default Permisions