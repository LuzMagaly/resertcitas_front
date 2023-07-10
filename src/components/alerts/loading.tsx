import { Spinner, Modal } from 'react-bootstrap'

export const Loading = ({ show }: { show: boolean  }) => {
    return (
        <Modal show={ show } centered>
            <Modal.Header>
                <Modal.Title>{ 'Cargando...' }</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                    <div className="text-center">
                    <Spinner animation="grow" />
                    <Spinner animation="grow" />
                    <Spinner animation="grow" />
                    </div>
                <br/>
                <span className="text-center">{ 'No salga de esta página por favor' }</span>
            </Modal.Body>
        </Modal>
    )
}