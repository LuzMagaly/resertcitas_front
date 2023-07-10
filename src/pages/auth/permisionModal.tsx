import { Modal } from "react-bootstrap"
import { PermisionForm } from "pages/auth/permisionForm"

export const PermisionModal = ({ show, handleClose, value, getAllRows, dataList }: { show: boolean, handleClose: any, value: any, getAllRows: any, dataList: any[] }) => {

    const loadOptions = (arrayInn: any) => {
        let arrayTemp: any[] = []
        arrayInn.map((element: any) => {
            const item = {
                value: element.pkid,
                label: element.nombre
            }
            arrayTemp.push(item)
        })
        return arrayTemp
    }

    return (
        <Modal style={{ zIndex: 1050 }} size="lg" show={show} onHide={ handleClose } backdrop="static" keyboard={false}>
            <Modal.Header closeButton>
                <Modal.Title>Edición de rol</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <PermisionForm data={ value } handleClose={ handleClose } dataList={ loadOptions(dataList) } updateRows={ getAllRows }/>
            </Modal.Body>
        </Modal>
    )
}