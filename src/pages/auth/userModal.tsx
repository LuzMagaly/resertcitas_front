import { Modal } from "react-bootstrap"
import { UserForm } from "pages/auth/userForm"
//import { getRoles, getVisibilidades } from "../../services/userService"
import { useEffect, useState } from "react"

export const UserModal = ({ show, handleClose, value, getAllRows }: { show: boolean, handleClose: any, value: any, getAllRows: any }) => {

    const [dataVis, setDataVis] = useState([])
    const [dataRol, setDataRol] = useState([])

    useEffect(() => {
        getAllVisibilidades()
        getAllRoles()
    }, [])
    
    const getAllVisibilidades = async () => {
        //delete the option all
        const result: any = null//await getVisibilidades()
        if(result && result.length && result.length > 0){
            setDataVis(result.filter((item: any) => item.pkid != 1))
        }
    }
    
    const getAllRoles = async () => {
        const result: any = null//await getRoles()
        if(result && result.length && result.length > 0){
            setDataRol(result.filter((item: any) => item.pkid != 1))
        }
    }

    return (
        <Modal style={{ zIndex: 1050 }} size="lg" show={show} onHide={handleClose} backdrop="static" keyboard={false}>
            <Modal.Header closeButton>
                <Modal.Title>Edición de usuario</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <UserForm data={ value } handleClose={ handleClose } dataVis={ dataVis } dataRol={ dataRol } updateRows={ getAllRows }/>
            </Modal.Body>
        </Modal>
    )
}