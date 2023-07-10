import { Modal, Button } from "react-bootstrap"

export const Alert = ({ show, handleClose, title, message }: { show: boolean, handleClose: any, title: string, message: string }) => {
    return (
        <Modal show={ show } onHide={ handleClose } centered>
            <Modal.Header closeButton>
                <Modal.Title>{ title }</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <span>{ message }</span>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-primary" onClick={ handleClose }>Cerrar</Button>
            </Modal.Footer>
        </Modal>
    )
}