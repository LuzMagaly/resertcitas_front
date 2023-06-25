import { Button, Container, Form } from "react-bootstrap"
import TitleCard from "./cards/titleCard"
import ColumnCard from "./cards/columnCard"
import ContentCard from "./cards/contentCard"
import { Fragment, useEffect, useState } from "react"
import Confirm from "../components/confirm"
import Message from "../components/message"
import Loading from "../components/loader"
import Proccessing from "../components/proccessing"
import { getTimetableByDoctor, saveTimetable } from "../services/timetableService"

const Schedules = () => {

  const id_doctor = 1
  const [confirm, setConfirm] = useState(false)
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState(false)

  const daysWeek = ['Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado', 'Domingo']
  const standarHours = ['08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00']
  const [selectedHours, setSelectedHours] = useState<any[]>([])

  useEffect(() => {
    getRows()
  }, [])

  const getRows = async () => {
    const result: any = await getTimetableByDoctor(id_doctor)
    if(result && result.length && result.length > 0){
      setSelectedHours(formatArray(result))
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
    if(selectedHours && selectedHours.length && selectedHours.length > 0){
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
        Estado: 'ACTIVO',
      }
      payload_items.push(payload)
    })
    const result = await saveTimetable(payload_items)
    setLoading(false)
    if(result){

    }
  }

  return (
    <Fragment>
      <Container>
        <Button onClick={ saveRows }>Guardar</Button>
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