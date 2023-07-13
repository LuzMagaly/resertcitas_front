import { useEffect, useState } from "react"
import { Modal } from "react-bootstrap"

type childrenProps = {
    show: boolean,
    handleClose: any
}

export const CreateModal = ({ show, handleClose }: childrenProps) => {

  const [appointments, setAppointments] = useState<any[]>([])

  useEffect

  return (
    <Modal show={ show } onHide={ handleClose } size="lg">
        <Modal.Header closeButton>
        </Modal.Header>
        <Modal.Body>
            here!
        </Modal.Body>
    </Modal>
  )
}
