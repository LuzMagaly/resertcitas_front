import { Spinner, Modal } from 'react-bootstrap'

const Loading = ({ show, handleClose, state }: { show: boolean, handleClose: any, state: any }) => {
    return (
        <Modal show={ show } onHide={ handleClose } centered>
            <Modal.Body>
                <div className="position-relative">
                    <div className="position-absolute top-50 start-50 translate-middle" style={{ marginTop: '50vh' }}>
                        <div>
                            <Spinner animation="border" role="status">
                                <span className="visually-hidden">Loading...</span>
                            </Spinner>
                        </div>
                    </div>
                </div>
            </Modal.Body>
        </Modal>
    )
}

export default Loading