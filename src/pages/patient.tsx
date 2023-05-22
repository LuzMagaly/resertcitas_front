import { Fragment, useState } from 'react'
import { Table, Container, Button } from 'react-bootstrap'
import PatientModal from './modals/patientModal'

const Patient = () => {
  const [show, setShow] = useState(false)
  const [dataIni, setDataIni] = useState([])

  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  return (
    <Fragment>
      <Container fluid>
        <div className="d-flex bd-highlight mb-3">
          <div className="me-auto p-2 bd-highlight">
            <h1>Pacientes</h1>
          </div>
          <div className="p-2 bd-highlight">
            <Button variant="primary" onClick={ handleShow }>Nuevo</Button>{' '}
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
            <tr onClick={ handleShow }>
              <td>1</td>
              {Array.from({ length: 12 }).map((_, index) => (
                <td key={index}>Table cell {index}</td>
              ))}
            </tr>
          </tbody>
        </Table>
      </Container>

      <PatientModal show={ show } handleClose={ handleClose }/>
    </Fragment>
  )
}

export default Patient