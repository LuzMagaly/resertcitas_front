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
import { getPermisionsAll, getRolesAll } from "services/permisionRolService"

//#endregion

export const Permisions = () => {

  const [rows, setRows] = useState<any[]>([])
  const [permisions, setPermisions] = useState<any[]>([])
  const [activeRow, setActiveRow] = useState<any>(null)
  const [show, setShow] = useState(false)

  useEffect(() => {
    getPermisions()
  }, [])

  const getRows = async () => {
    const result: any = await getRolesAll()
    if(result && result.length && result.length > 0){
      setRows(result)
    }
  }

  const getPermisions = async () => {
    const result: any = await getPermisionsAll()
    if(result && result.length && result.length > 0){
      setPermisions(result)
    }
    getRows()
  }

  const showPermision = (id: number) => {
    const found = permisions.find((item: any) => item.Id == id)
    if(found){
      return found.Nombre
    }
    else{
      return 'No definido'
    }
  }

  const editRow = (item: any) => {
    setActiveRow(item)
    handleShow()
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
        </div>
        <div style={{ maxHeight: '10vh' }}>
          <Table responsive className="table table-bordered table-striped table-hover" style={{ overflowX: 'auto', display: 'block', height: '75vh' }}>
            <thead>
              <tr className="align-middle" style={{ textAlign: 'center' }}>
                <th>ID</th>
                <th>Nombre</th>
                <th>Permisos</th>
                <th>Opciones</th>
              </tr>
            </thead>
            <tbody>
              {
                rows.map((item: any, index: number) => (
                  <tr key={ index }>
                    <td className="text-center">{ item.Id }</td>
                    <td className="text-center">{ item.Nombre }</td>
                    <td style={{ minWidth: '200px' }}>{ item.RolPermiso?.map((element: any, i: number) => <span key={ i }>-{ showPermision(element.Id_Permiso) }<br/></span>) }</td>
                    <td className="text-center">
                    <span>
                        <Button className="mb-2" variant='success' onClick={ () => editRow(item) }><FontAwesomeIcon icon={ faPen }/> Editar</Button>{ ' ' }
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
    </Fragment>
  )
}