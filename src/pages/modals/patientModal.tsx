import { Modal, Button, Form } from "react-bootstrap"
import UserForm from "../forms/userForm"

const PatientModal = ({ show, handleClose }: { show: boolean, handleClose: any }) => {
  return (
    <Modal size="lg" show={show} onHide={handleClose} backdrop="static" keyboard={false}>
        <Modal.Header closeButton>
            <Modal.Title>Edición de paciente</Modal.Title>
        </Modal.Header>
        <Modal.Body>

        <UserForm/>

        </Modal.Body>
        <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
            Close
            </Button>
            <Button variant="primary" onClick={handleClose}>
            Save Changes
            </Button>
        </Modal.Footer>
    </Modal>
  )
}

export default PatientModal