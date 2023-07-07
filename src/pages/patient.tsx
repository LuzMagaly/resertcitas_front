import { Fragment, useState, useEffect } from 'react'
import { Table, Container, Button } from 'react-bootstrap'
import EditorUserModal from './modals/editorUserModal'
import { getPatientAll } from '../services/patientService'

const Patient = () => {
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
    const result = await getPatientAll()
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
            <h1>Pacientes</h1>
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
              <th>DNI</th>
              <th>Nombres</th>
              <th>Apellido paterno</th>
              <th>Apellido materno</th>
              <th>Fecha de nacimiento</th>
              <th>Direccion</th>
              <th>Teléfono</th>
              <th>Sexo</th>
              <th>Tiene alergias?</th>
              <th>Alergias</th>
              <th>Tipo de sangre</th>
              <th>Factor</th>
              <th>Donación de organos</th>
              <th>Contacto de emergencia</th>
              <th>Número de emergencia 1</th>
              <th>Número de emergencia 2</th>
            </tr>
          </thead>
          <tbody>
            {
              dataIni.map((item: any, index: number) => (
                <tr key={ index } onClick={ () => editRow(item.Id) }>
                  <td className="text-center">{ item.Id }</td>
                  <td className="text-center">{ item.Usuarios_Pacientes_Id_UsuarioToUsuarios.DNI }</td>
                  <td className="text-center">{ item.Usuarios_Pacientes_Id_UsuarioToUsuarios.Nombres }</td>
                  <td className="text-center">{ item.Usuarios_Pacientes_Id_UsuarioToUsuarios.Apellido_Paterno }</td>
                  <td className="text-center">{ item.Usuarios_Pacientes_Id_UsuarioToUsuarios.Apellido_Materno }</td>
                  <td className="text-center">{ new Date(item.Usuarios_Pacientes_Id_UsuarioToUsuarios.Fecha_Nacimiento).toLocaleDateString('en-GB') }</td>
                  <td className="text-center">{ item.Usuarios_Pacientes_Id_UsuarioToUsuarios.Direccion }</td>
                  <td className="text-center">{ item.Usuarios_Pacientes_Id_UsuarioToUsuarios.Telefono }</td>
                  <td className="text-center">{ item.Usuarios_Pacientes_Id_UsuarioToUsuarios.Sexo == 'M' ? 'Masculino' : 'Femenino' }</td>
                  <td className="text-center">{ item.Tiene_Alergias == '1' ? 'Sí' : 'No' }</td>
                  <td className="text-center">{ item.Alergias }</td>
                  <td className="text-center">{ item.Tipo_Sangre }</td>
                  <td className="text-center">{ item.Factor_Sangre }</td>
                  <td className="text-center">{ item.Donacion_Organos == '1' ? 'Sí' : 'No' }</td>
                  <td className="text-center">{ item.Contacto_Emergencia }</td>
                  <td className="text-center">{ item.Numero_Emergencia_1 }</td>
                  <td className="text-center">{ item.Numero_Emergencia_2 }</td>
                </tr>
              ))
            }
          </tbody>
        </Table>
      </Container>

      {
        !!show && <EditorUserModal show={ show } handleClose={ handleClose } type={ 'paciente' } userID={ editId }/>
      }
    </Fragment>
  )
}

export default Patient