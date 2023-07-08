import { Fragment, useEffect, useState } from 'react'
import { Table, Container, Button } from 'react-bootstrap'
import EditorUserModal from './modals/editorUserModal'
import { getDoctorAll } from '../services/doctorService'

const Doctor = () => {
  const [show, setShow] = useState(false)
  const [dataIni, setDataIni] = useState([])
  const [editId, setEditId] = useState<number | null>(null)

  const handleClose = () => {
    setShow(false)
    getRows()
  }
  const handleShow = () => setShow(true)

  useEffect(() => {
    getRows()
  }, [])

  const getRows = async () => {
    const result = await getDoctorAll()
    if(result && result.length && result.length > 0){
      setDataIni(result)
    }
  }

  const editRow = (id: number) => {
    setEditId(id)
    handleShow()
  }

  const newRow = () => {
    setEditId(null)
    handleShow()
  }

  return (
    <Fragment>
      <Container fluid>
        <div className="d-flex bd-highlight mb-3">
          <div className="me-auto p-2 bd-highlight">
            <h1>Médicos</h1>
          </div>
          <div className="p-2 bd-highlight">
            <Button variant="primary" onClick={ newRow }>Nuevo</Button>{' '}
          </div>
        </div>
        <hr/>
        <Table responsive className="table table-bordered table-striped table-hover">
          <thead>
            <tr className="align-middle" style={{ textAlign: 'center' }}>
              <th>ID</th>
              <th>Nombres</th>
              <th>Apellido paterno</th>
              <th>Apellido materno</th>
              <th>Especialidad</th>
              <th>CMP</th>
              <th>Grado</th>
            </tr>
          </thead>
          <tbody>
            {
              dataIni.map((item: any, index: number) => (
                <tr key={ index } onClick={ () => editRow(item.Usuarios_Medicos_Id_UsuarioToUsuarios.Id) }>
                  <td className="text-center">{ item.Id }</td>
                  <td className="text-center">{ item.Usuarios_Medicos_Id_UsuarioToUsuarios.Nombres }</td>
                  <td className="text-center">{ item.Usuarios_Medicos_Id_UsuarioToUsuarios.Apellido_Paterno }</td>
                  <td className="text-center">{ item.Usuarios_Medicos_Id_UsuarioToUsuarios.Apellido_Materno }</td>
                  <td className="text-center">{ item.Especialidades.Nombre }</td>
                  <td className="text-center">{ item.Codigo }</td>
                  <td className="text-center">{ item.Grado_Instruccion }</td>
                </tr>
              ))
            }
          </tbody>
        </Table>
      </Container>

      {
        !!show && <EditorUserModal show={ show } handleClose={ handleClose } type={ 'médico' } userID={ editId }/>
      }
    </Fragment>
  )
}

export default Doctor