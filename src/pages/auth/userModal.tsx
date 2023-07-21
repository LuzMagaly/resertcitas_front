import { Modal } from "react-bootstrap"
import { UserForm } from "pages/auth/userForm"

export const UserModal = ({ show, handleClose, value, getAllRows, dataList }: { show: boolean, handleClose: any, value: any, getAllRows: any, dataList: any }) => {

    return (
        <Modal style={{ zIndex: 1050 }} size="lg" show={show} onHide={handleClose} backdrop="static" keyboard={false}>
            <Modal.Header closeButton>
                <Modal.Title>Edición de usuario</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <UserForm data={ value } handleClose={ handleClose } dataRol={ dataList } updateRows={ getAllRows }/>
            </Modal.Body>
        </Modal>
    )
}