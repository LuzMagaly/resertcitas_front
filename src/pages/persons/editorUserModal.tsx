import { useState, Fragment, useEffect } from 'react'
import { Modal, Button, Accordion } from "react-bootstrap"
import { UserForm } from "pages/persons/userForm"
import { PatientForm } from "pages/persons/patientForm"
import { DoctorForm } from "pages/persons/doctorForm"
import { QuestionUserForm } from "pages/persons/questionUserForm"
import { getUserById } from 'services/userService'
import { getPatientByUser } from 'services/patientService'
import { getDoctorByUser } from 'services/doctorService'
import { Loading } from 'components/alerts/loading'

export const EditorUserModal = ({ show, handleClose, type, userID = null }: { show: boolean, handleClose: any, type: string, userID?: number | null }) => {
  const [eventSave, setEventSave] = useState(0)
  const [eventSaveNext, setEventSaveNext] = useState(0)
  const [userSelected, setUserSelected] = useState(userID ? 1 : 0)
  const [dataUser, setDataUser] = useState<any>(undefined)
  const [dataNext, setDataNext] = useState<any>('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if(userID){
      getPerson()
    }
  }, [])

  const selectUser = (typeSelect: number, data: any) => {
    setUserSelected(typeSelect)
    setDataUser(data)
    if(typeSelect == 2){
      if(type == 'médico'){
        getDoctor(data.DNI)
        return
      }
      if(type == 'paciente'){
        getPatient(data.DNI)
        return
      }
    }
  }

  const getPerson = async () => {
    setLoading(true)
    const result = await getUserById(userID as number)
    setLoading(false)
    setDataUser(result)
    if(result){
      if(type == 'médico'){
        getDoctor(result.DNI)
        return
      }
      if(type == 'paciente'){
        getPatient(result.DNI)
        return
      }
    }
  }

  const getPatient = async (dni: string) => {
    setLoading(true)
    const result = await getPatientByUser({ DNI: dni })
    setLoading(false)
    if(result && result.length && result.length > 0){
      setDataNext(result[0])
    }
  }

  const getDoctor = async (dni: string) => {
    setLoading(true)
    const result = await getDoctorByUser({ DNI: dni })
    setLoading(false)
    if(result && result.length && result.length > 0){
      setDataNext(result[0])
    }
  }

  const saveAll = () => {
    setEventSave(eventSave + 1)
  }

  const callbackResponseUser = (result: any) => {
    setDataUser(result)
    setEventSaveNext(eventSaveNext + 1)
  }

  const callbackResponseNext = (result: any) => {
    handleClose()
  }

  return (
    <Fragment>
      <Modal size="lg" show={show} onHide={ handleClose } backdrop="static" keyboard={false}>
          <Modal.Header closeButton>
              <Modal.Title>Edición de { type }</Modal.Title>
          </Modal.Header>
          <Modal.Body>

          {
            userSelected === 0 ?
              <QuestionUserForm onSelectUser={ selectUser } />
            :
              <Fragment>
                <Accordion defaultActiveKey="0" flush>
                  <Accordion.Item eventKey="0">
                    <Accordion.Header>Datos generales</Accordion.Header>
                    <Accordion.Body style={{ backgroundColor: 'white' }}>
                      <UserForm data={ dataUser } onEventSave={ eventSave } callbackResponse={ callbackResponseUser } typeUser={ type }/>
                    </Accordion.Body>
                  </Accordion.Item>
                  <Accordion.Item eventKey="1">
                    <Accordion.Header>Datos { type == 'médico' ? 'profesionales' : 'clínicos'}</Accordion.Header>
                    <Accordion.Body style={{ backgroundColor: 'white' }}>
                      {
                        type == 'paciente' && <PatientForm data={ dataNext } onEventSave={ eventSaveNext } dataUser={ dataUser } callbackResponse={ callbackResponseNext }/>
                      }
                      {
                        type == 'médico' && <DoctorForm data={ dataNext } onEventSave={ eventSaveNext } dataUser={ dataUser } callbackResponse={ callbackResponseNext }/>
                      }
                    </Accordion.Body>
                  </Accordion.Item>
                </Accordion>
              </Fragment>
          }


          </Modal.Body>
          <Modal.Footer>
              {
                userSelected !== 0 &&
                  <Button variant="success" onClick={ saveAll }>
                    Guardar
                  </Button>
              }
              <Button variant="danger" onClick={ handleClose }>
                Salir
              </Button>
          </Modal.Footer>
      </Modal>
      {
          !!loading &&
          <Loading show={ loading } />
      }
    </Fragment>
  )
}

export default EditorUserModal