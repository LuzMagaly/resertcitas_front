import { Alert } from "components/alerts/alert"
import { Confirm } from "components/alerts/confirm"
import { Loading } from "components/alerts/loading"
import { Consultations } from "pages/medical/consultations"
import { AuthContext } from "providers/authContext";
import { Fragment, useEffect, useState, useContext } from 'react';
import { Modal } from "react-bootstrap"
import { saveAppointment } from "services/appointmentService";
import { getScheduleBySpecialty } from "services/scheduleService"

type childrenProps = {
    show: boolean,
    handleClose: any,
    params: any,
    socket: any,
    patient?: any
}

export const CreateModal = ({ show, handleClose, params, socket, patient }: childrenProps) => {

  const { session } = useContext(AuthContext)
  const [alert, setAlert] = useState(false)
  const [confirm, setConfirm] = useState(false)
  const [loading, setLoading] = useState(false)
  const [rows, setRows] = useState<any[]>([])
  const [selected, setSelected] = useState<any[]>([])

  useEffect(() => {
    getRows()
  }, [])

  
  socket.on('CallBackAfterInsertAppointment', (response: any) => {
    loadSchedules(response)
  })

  const getRows = async () => {
    setLoading(true)
    const result = await getScheduleBySpecialty(params)
    setLoading(false)
    loadSchedules(result)    
  }

  const loadSchedules = async (result: any) => {
    if(result && result.length && result.length > 0){
      setRows(result)
    }
    else{
      handleClose()
    }
}

  const selectCalendar = (id: any) => {
    setSelected(id)
    setConfirm(true)
  }

  const saveAppointmentOnDatabase = async () => {
    setConfirm(false)
    setLoading(true)
    const payload = {
      Item: {
        Id_AgendaCalendario: selected,
        Id_Paciente: patient? patient : session.Pacientes_Pacientes_Id_UsuarioToUsuarios.Id,
        Creado_Por: session.Id
      },
      Select: params
    }
    const result = await saveAppointment(payload)
    setLoading(false)
    if(result){
      handleClose()
    }
  }

  //useEffect

  return (
    <Fragment>
      <Modal show={ show } onHide={ handleClose } size="xl" style={{ zIndex: 1050 }}>
          <Modal.Header closeButton>
          </Modal.Header>
          <Modal.Body>
            <Consultations dataList={ rows } onClick={ (id: any) => selectCalendar(id) }/>
          </Modal.Body>
      </Modal>
      {
      !!loading &&
      <Loading show={ loading } />
      }
      {
        !!alert &&
        <Alert show={ alert } handleClose={ () => setAlert(false) } title="Alerta" message="La cita no pudo ser reservada"/>
      }
      {
        !!confirm &&
        <Confirm show={ confirm } handleClose={ () => setConfirm(false) } action={ saveAppointmentOnDatabase } title={"Confirmación de guardado"} message={"¿Está seguro de guardar esta cita?"}  />
      }
    </Fragment>
  )
}
