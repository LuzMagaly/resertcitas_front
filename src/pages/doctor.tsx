import { Fragment, useState } from 'react'
import { Table, Container, Button } from 'react-bootstrap'
import DoctorModal from './modals/doctorModal'

const Doctor = () => {
  const [show, setShow] = useState(false)
  const [dataIni, setDataIni] = useState([])

  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  return (
    <Fragment>
      <Container fluid>
        <div className="d-flex bd-highlight mb-3">
          <div className="me-auto p-2 bd-highlight">
            <h1>Médicos</h1>
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
              <th>Nombres</th>
              <th>Apellido paterno</th>
              <th>Apellido materno</th>
              <th>Especialidad</th>
              <th>CMP</th>
              <th>Grado</th>
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

      <DoctorModal show={ show } handleClose={ handleClose }/>
    </Fragment>
  )
}

export default Doctor