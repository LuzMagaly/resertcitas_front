import { Fragment, useState } from 'react';
import { Table, Container, Button } from 'react-bootstrap';
import PatientModal from './modals/patientModal';

const Patient = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <Fragment>
      <Container fluid>
        <div className="d-flex bd-highlight mb-3">
          <div className="me-auto p-2 bd-highlight">
            <h1>Listado de pacientes</h1>
          </div>
          <div className="p-2 bd-highlight">
            <Button variant="primary" onClick={handleShow}>Nuevo</Button>{' '}
          </div>
        </div>
        <hr/>
        <Table responsive>
          <thead>
            <tr>
              <th>#</th>
              {Array.from({ length: 12 }).map((_, index) => (
                <th key={index}>Table heading</th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              {Array.from({ length: 12 }).map((_, index) => (
                <td key={index}>Table cell {index}</td>
              ))}
            </tr>
            <tr>
              <td>2</td>
              {Array.from({ length: 12 }).map((_, index) => (
                <td key={index}>Table cell {index}</td>
              ))}
            </tr>
            <tr>
              <td>3</td>
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