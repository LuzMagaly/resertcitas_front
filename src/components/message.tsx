import { Modal, Button } from "react-bootstrap"

const Message = ({ show, handleClose, title, message }: { show: boolean, handleClose: any, title: string, message: string }) => {

    return (
        <Modal show={ show } onHide={ handleClose } centered>
            <Modal.Header closeButton>
                <Modal.Title>{ title }</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <span>{ message }</span>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-danger" onClick={ handleClose }>Cancelar</Button>
            </Modal.Footer>
        </Modal>
    )
}

export default Message