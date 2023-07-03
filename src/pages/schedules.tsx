import { Button, Container, Form } from "react-bootstrap"
import TitleCard from "./cards/titleCard"
import ColumnCard from "./cards/columnCard"
import ContentCard from "./cards/contentCard"
import { Fragment, useEffect, useState } from "react"
import Confirm from "../components/confirm"
import Message from "../components/message"
import Proccessing from "../components/proccessing"
import { getTimetableByDoctor, saveTimetable } from "../services/timetableService"
import { getOfficeBySpecialty } from "../services/officeService"
import { days, hours } from "../constants/date"

const Schedules = () => {

  //Obtener desde la sesion
  const id_doctor = 1
  const id_especialidad = 2

  const [confirm, setConfirm] = useState(false)
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState(false)

  const daysWeek = days
  const standarHours = hours
  const [selectedHours, setSelectedHours] = useState<any[]>([])
  const [offices, setOffices] = useState<any[]>([])
  const [selectedOffice, setSelectedOffice] = useState<any>()

  useEffect(() => {
    getRows()
    getOffices()
  }, [])

  const getRows = async () => {
    const result: any = await getTimetableByDoctor(id_doctor)
    if(result && result.length && result.length > 0){
      setSelectedHours(formatArray(result))
    }
  }

  const getOffices = async () => {
    const result = await getOfficeBySpecialty(id_especialidad.toString())
    if(result && result.length && result.length > 0){
      setOffices(result)
      setSelectedOffice(result[0].Id)
    }
  }

  const formatArray = (data: any[]): any[] => {
    const returnData: any[] = []
    data.map((item: any) => {
      const date = new Date(item.Hora_Inicio)
      const newItem = {
        hora: `${ date.getHours() < 10 ? '0' : '' }${ date.getHours() }:00`,
        dia: item.Dia_Nombre
      }
      returnData.push(newItem)
    })
    return returnData
  }

  const selectHour = (item: string, element: string) => {
    let existsHours = selectedHours
    const exists = existsHours.findIndex((_) => _.hora == item && _.dia == element)
    if(exists == -1){
      const value = {
        hora: item,
        dia: element
      }
      existsHours.push(value)
    }
    else{
      existsHours.splice(exists, 1)
    }
    setSelectedHours(existsHours)
  }

  const getSelected = (hora: string, dia: string) => {
    const result = selectedHours.find((item: any) => item.dia == dia && item.hora == hora)
    return result? true: false
  }

  const saveRows = () => {
    if(selectedHours && selectedHours.length && selectedHours.length > 0 && selectedOffice){
    setConfirm(true)
    }
  }

  const sendRowsToDatabase = async () => {
    setConfirm(false)
    setLoading(true)
    const payload_items: any[] = []

    selectedHours.map((item: any) => {
      const payload = {
        Id_Medico: 1,
        Hora_Inicio: new Date("01-01-2020 " + item.hora + ":00"),
        Hora_Fin: new Date("01-01-2020 " + item.hora.replace('00', '59') + ":00"),
        Dia_Nombre: item.dia,
        Estado: selectedOffice.toString(),
      }
      payload_items.push(payload)
    })
    const result = await saveTimetable(payload_items)
    setLoading(false)
    if(result){
      getRows()
    }
  }

  const handleChangeOffice = (event: any) => {
    const value = event.target.value
    if(value){
      setSelectedOffice(value)
    }
  }

  return (
    <Fragment>
      <Container>
        <div className="d-flex">
          <div className="me-auto p-0">
            <h1>Mi Horario</h1>
          </div>
          <div className="p-1">
            <Form.Select onChange={ handleChangeOffice } value={ selectedOffice }>
              {
                offices.map((item: any, index: number) =>
                  <option key={ index } value={ item.Id }>{ item.Nombre }</option>
                )
              }
            </Form.Select>
          </div>
          <div className="p-1">
            <Button variant="success" onClick={ saveRows }>Guardar cambios</Button>
          </div>
        </div>
        <hr/>
        <div className="d-flex flex-row">
          <div className="p-0 m-1" style={{ width: '15rem' }}></div>
          {
            daysWeek.map((day: any, index: number) =>
              <TitleCard key={ index } title={ day }/>
            )
          }
        </div>
          {
            standarHours.map((item: any, index: number) =>
              <div  key={ index } className="d-flex flex-row">
                <ColumnCard hour={ item }/>
                {
                  daysWeek.map((element: any, index: number) =>
                    <ContentCard key={ index } onClick={ () => selectHour(item, element) } selected={ getSelected(item, element) }/>
                  )
                }
              </div>
            )
          }
      </Container>
      {
        !!confirm &&
          <Confirm show={ confirm } handleClose={ () => setConfirm(false) } action={ sendRowsToDatabase } title="Confirmación de guardado" message="Esta operación puede tardar algunos segundos, ¿Desea continuar?"/>
      }
      {
        !!loading &&
          <Proccessing show={ loading } title="Ejecutando operación" message="No salga de esta página por favor"/>
      }
      {
        !!message &&
          <Message show={ message } handleClose={ () => setMessage(false) } title="Error de conexión" message="La operación no pudo completarse con exito, por favor vuelva a intentarlo"/>
      }
    </Fragment>
  )
}

export default Schedules