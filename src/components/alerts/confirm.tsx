import { Modal, Button } from "react-bootstrap"

export const Confirm = ({ show, handleClose, action, title, message }: { show: boolean, handleClose: any, action: any, title: string, message: string }) => {
    return (
        <Modal style={{ zIndex: 1055 }} show={ show } onHide={ handleClose } centered>
            <Modal.Header closeButton>
                <Modal.Title>{ title }</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <span>{ message }</span>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="success" onClick={ action } >Aceptar</Button>{' '}
                <Button variant="outline-danger" onClick={ handleClose }>Cancelar</Button>
            </Modal.Footer>
        </Modal>
    )
}