import { Modal, Spinner } from "react-bootstrap"

export const Proccessing = ({ show, title, message, render = null }: { show: boolean, title: string, message: string, render?: any }) => {
    return (
        <Modal show={ show } centered>
            <Modal.Header>
                <Modal.Title>{ title }</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                    <div className="text-center">
                    <Spinner animation="grow" />
                    <Spinner animation="grow" />
                    <Spinner animation="grow" />
                    </div>
                <br/>
                <span className="text-center">{ message }</span>
                {
                    render &&
                    <div className="text-center"><br/>{ render }<br/></div>
                }
            </Modal.Body>
        </Modal>
    )
}