import { ShowAppointmentsGeneral } from "pages/home/showAppointmentsGeneral"
import { useEffect, useState } from "react"
import { Form, Modal } from "react-bootstrap"
import Select from 'react-select'
import { getPatientAll } from "services/patientService"
type childrenProps = {
    show: boolean,
    handleClose: any,
}

const CreateAppointment = ({ show, handleClose }: childrenProps) => {

  const [patientSelected, setPatientSelected] = useState<any>(null)
  const [patienList, setPatientList] = useState<any[]>([])
    
  useEffect(() => {
    getRows()
  }, [])
  
  const getRows = async () => {const result = await getPatientAll(); if(result && result.length && result.length > 0) { setPatientList(formatList(result)) } else { setPatientList([]) }}

  const formatList = (items: any[]): any[] => items.map((itm: any) => { return { value: itm.Id, label: `${ itm.Usuarios_Pacientes_Id_UsuarioToUsuarios
.DNI
} | ${ itm.Usuarios_Pacientes_Id_UsuarioToUsuarios.Nombres } ${ itm.Usuarios_Pacientes_Id_UsuarioToUsuarios.Apellido_Paterno } ${ itm.Usuarios_Pacientes_Id_UsuarioToUsuarios.Apellido_Materno
}` } })

  const handleChangePatient = (items: any) => {
    setPatientSelected(items)
  }
  return (
    <Modal show={ show } onHide={ handleClose } size="xl" style={{ zIndex: 1050 }}>
        <Modal.Header closeButton>
        </Modal.Header>
        <Modal.Body>
            <div className="mb-4">
            <span>Seleccionar paciente</span>
            <Select
                value={ (patientSelected && patientSelected)  ? patientSelected : 0}
                name="colors"
                options={ patienList }
                className="basic-multi-select"
                classNamePrefix="select"
                onChange={ handleChangePatient }
            />
            </div>
            {
              patientSelected &&
              <ShowAppointmentsGeneral id={ (patientSelected && patientSelected.value) ? patientSelected.value : null }/>
            }
        </Modal.Body>
    </Modal>
  )
}

export default CreateAppointment