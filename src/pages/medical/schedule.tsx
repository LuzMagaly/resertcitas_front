import { Fragment, useEffect, useState } from "react"
import { Container, Button, Form, Row, Col, Tabs, Tab } from "react-bootstrap"
import { getSpecialtyAll } from "services/specialtyService"
import { days } from "constants/date"
import { getTimetableBySpecialtyWidthDoctor } from "services/timetableService"
import { getScheduleBySpecialty, saveSchedule } from "services/scheduleService"
import { Consultations } from "pages/medical/consultations"
import { Alert } from "components/alerts/alert"
import { Loading } from "components/alerts/loading"
import { ScheduleTable } from "./scheduleTable"
import { Confirm } from "components/alerts/confirm"

type childrenProps = {

}

export const Schedule = ({}: childrenProps) => {

  //#region [ VARIABLES ]

  const actual_date = new Date()
  actual_date.setDate(actual_date.getDate() - 1)

  const daysWeek = days
  const [rows, setRows] = useState<any[]>([])
  const [rowsSpecialty, setRowsSpecialty] = useState<any[]>([])
  const [listSpecialties, setListSpecialties] = useState<any[]>([])
  const [currentDate, setCurrentDate] = useState<string>(new Date().toLocaleString('en-us', {year: 'numeric', month: '2-digit', day: '2-digit'}).replace(/(\d+)\/(\d+)\/(\d+)/, '$3-$1-$2'))
  const [selectedSpecialty, setSelectedSpecialty] = useState<any>(0)
  const [listTimes, setListTimes] = useState<any>([])
  const [selectedTimes, setSelectedTimes] = useState<any>([])

  const [showTable, setShowTable] = useState<boolean>(false)
  const [loaded, setLoaded] = useState<boolean>(false)
  const [alertNoTimes, setAlertNoTimes] = useState(false)
  const [loading, setLoading] = useState(false)
  const [confirm, setConfirm] = useState(false)

  //#endregion

  //#region [ EFFECTS ]

    useEffect(() => {
      getAllSpecialties()
    }, [])

    useEffect(() => {
      setLoaded(false)
      if(listSpecialties && listSpecialties.length && listSpecialties.length > 0){
        getRows()
      }
      else{
        setLoading(false)
      }
    }, [currentDate, listSpecialties, selectedSpecialty])

  //#endregion

  //#region [ METHODS ]

    const getAllSpecialties = async () => {
      setLoading(true)
      const result = await getSpecialtyAll()
      if(result && result.length && result.length > 0){
        result.splice(0, 1)
        setListSpecialties(result)
      }
    }

    const getRows = async () => {
      const id_specialty: number[] = selectedSpecialty != 0 ? [parseInt(selectedSpecialty)] : listSpecialties.map((item: any) => item.Id)
      const date = new Date(currentDate)
      const payload = {
        Id: id_specialty,
        Fecha: date
      }
      setLoading(true)
      const result = await getScheduleBySpecialty(payload)
      setLoading(false)
      setLoaded(true)
      if(result && result.length && result.length > 0){
        extractSpecialtiesFromRows(result)
        setRows(result)
      }
      else{
        setRowsSpecialty([])
        setRows([])
      }
    }

    const getTimes = async () => {
      const id_specialty: number[] = selectedSpecialty != 0 ? [parseInt(selectedSpecialty)] : listSpecialties.map((item: any) => item.Id)
      const dayWeekSelected = daysWeek[new Date(currentDate).getDay()]
      const payload = {
        Id: id_specialty,
        Day: dayWeekSelected
      }
      return await getTimetableBySpecialtyWidthDoctor(payload)
    }

    const extractSpecialtiesFromRows = (items: any[]) => {
      const tempSpecialties: any[] = items.map((item: any) => item.Medicos.Id_Especialidad)
      const specialtiesDistinct = tempSpecialties.filter((n: any, i: any) => tempSpecialties.indexOf(n) === i)
      setRowsSpecialty(specialtiesDistinct)
    }

    const startCalendar = async () => {
      setLoading(true)
      const result = await getTimes()
      setLoading(false)
      if(result && result.length && result.length > 0){
        setListTimes(result)
        setShowTable(true)
      }
      else{
        setListTimes([])
        setAlertNoTimes(true)
      }
    }

    const generateCalendar = async (selecteds: any) => {

      const items: any[] = []
      selecteds.map((element: any) => {
        const item = {
          Id_Consultorio: parseInt(element.Estado),
          Id_Medico: element.Id_Medico,
          Hora_Inicio: element.Hora_Inicio,
          Hora_Fin: element.Hora_Fin,
          Turno: new Date(element.Hora_Inicio).getHours() <= 12 ? 'Mañana' : 'Tarde',
          Fecha: new Date(currentDate).toISOString(),
          Estado: 'ACTIVO',
        }
        items.push(item)
      })

      setSelectedTimes(items)
      setConfirm(true)
    }

    const saveCalendar = async () => {
      setConfirm(false)
      const payload = {
        Items: selectedTimes
      }
      setLoading(true)
      const result = await saveSchedule(payload)
      setLoading(false)
      setShowTable(false)
      getRows()
    }

  //#endregion

  //#region [ EVENTS ]

    const handleChangeDate = (event: any) => {
      setCurrentDate(event.target.value)
    }

    const handleChangeSpecialty = (event: any) => {
      const value = event.target.value
      if(value){
        setSelectedSpecialty(value)
      }
    }

    const getBySpecialty = (id: number) => {
      const result = rows.filter((item: any) => item.Medicos.Id_Especialidad == id)
      if(result && result.length && result.length > 0){
        return result
      }
      else{
        return []
      }
    }

    const getNameSpecialty = (id: number): string => {
      const found = listSpecialties.find((_: any) => _.Id == id)
      return found.Nombre
    }

  //#endregion

  //#region [ PROPERTIES ]

  //#endregion

  //#region [ RENDER ]

    return (
      <Fragment>
        <Container fluid>
          <div className="d-flex bd-highlight mb-3">
            <div className="me-auto p-2 bd-highlight">
              <h1>Calendario de citas</h1>
            </div>
            <div className="p-2 bd-highlight">
            </div>
          </div>
          <hr/>

          <Form>
            <Row>
              <Col sm="3">
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                  <Form.Label>Especialidad</Form.Label>
                  <Form.Select value={ selectedSpecialty } onChange={ handleChangeSpecialty }>
                    <option value={ 0 }>Todos</option>
                    {
                      listSpecialties.map((item: any, index: number) =>
                        <option key={ index } value={ item.Id }>{ item.Nombre }</option>
                      )
                    }
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col sm="2">
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                  <Form.Label>Fecha</Form.Label>
                  <Form.Control type="date" value={ currentDate } onChange={ handleChangeDate } />
                </Form.Group>
              </Col>
            </Row><hr/>
          </Form>

          {
            (rowsSpecialty && rowsSpecialty.length && rowsSpecialty.length > 0) ?
              <Tabs defaultActiveKey={ rowsSpecialty[0] } className="mb-3">
                {
                  rowsSpecialty.map((item: any, index: number) =>
                    <Tab key={ index } eventKey={ item } title={ getNameSpecialty(item) }>
                      <Consultations dataList={ getBySpecialty(item) } />
                    </Tab>
                  )
                }
              </Tabs>
            :
            <div className="text-center">
              {
                ((!rows || rows.length == 0) && !!loaded) &&
                  <div className="mt-4 p-2">
                    <span>No hay citas generadas, pulsa para generar</span><br/><br/>
                    <Button variant="primary" onClick={ startCalendar }>Generar</Button>{' '}
                  </div>
              }
            </div>
          }

        </Container>

        {
          !!alertNoTimes &&
          <Alert show={ alertNoTimes } handleClose={ () => setAlertNoTimes(false) } title="Aviso" message="No se han encontrado horarios para esa especialidad"/>
        }
        {
          !!loading &&
          <Loading show={ loading } />
        }
        {
          !!showTable &&
          <ScheduleTable show={ showTable } handleClose={ () => setShowTable(false) } onSave={ (items: any[]) => generateCalendar(items) } value={ listTimes } />
        }
        {
          !!confirm &&
          <Confirm show={ confirm } handleClose={ () => setConfirm(false) } action={ saveCalendar } title={"Confirmación de guardado"} message={"¿Está seguro de generar estas citas?"}  />
        }

      </Fragment>
    )

  //#endregion

}