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
    params: any
}

export const CreateModal = ({ show, handleClose, params }: childrenProps) => {

  const { session } = useContext(AuthContext)
  const [alert, setAlert] = useState(false)
  const [confirm, setConfirm] = useState(false)
  const [loading, setLoading] = useState(false)
  const [rows, setRows] = useState<any[]>([])
  const [selected, setSelected] = useState<any[]>([])

  useEffect(() => {
    console.log(session)
    getRows()
  }, [])

  const getRows = async () => {
    setLoading(true)
    const result = await getScheduleBySpecialty(params)
    console.log(result)
    if(result && result.length && result.length > 0){
      setRows(result)
    }
    else{
      setRows([])
    }
    setLoading(false)
    console.log(result)
  }

  const selectCalendar = (id: any) => {
    setSelected(id)
    setConfirm(true)
  }

  const saveAppointmentOnDatabase = async () => {
    setConfirm(false)
    setLoading(true)
    const payload = {
      Id_AgendaCalendario: selected,
      Id_Paciente: session.Id,
      Creado_Por: session.Id
    }

    console.log(payload)
    const result = await saveAppointment(payload)
    console.log(result)
    setLoading(false)
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
