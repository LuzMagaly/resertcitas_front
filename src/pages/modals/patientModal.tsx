import { Modal, Button, Accordion } from "react-bootstrap"
import UserForm from "../forms/userForm"
import PatientForm from "../forms/patientForm"
import QuestionUserForm from "../forms/questionUserForm"

const PatientModal = ({ show, handleClose }: { show: boolean, handleClose: any }) => {
  return (
    <Modal size="lg" show={show} onHide={handleClose} backdrop="static" keyboard={false}>
        <Modal.Header closeButton>
            <Modal.Title>Edición de paciente</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          
        {/* <QuestionUserForm/> */}

        {/* <Accordion defaultActiveKey="0" flush>
          <Accordion.Item eventKey="0">
            <Accordion.Header>Datos generales</Accordion.Header>
            <Accordion.Body style={{ backgroundColor: 'white' }}>
              <UserForm/>
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="1">
            <Accordion.Header>Datos clínicos</Accordion.Header>
            <Accordion.Body style={{ backgroundColor: 'white' }}>
              <PatientForm/>
            </Accordion.Body>
          </Accordion.Item>
        </Accordion> */}

        </Modal.Body>
        <Modal.Footer>
            {/* <Button variant="success" onClick={handleClose}>
              Guardar
            </Button> */}
            <Button variant="danger" onClick={handleClose}>
              Salir
            </Button>
        </Modal.Footer>
    </Modal>
  )
}

export default PatientModal