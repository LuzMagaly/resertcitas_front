import { Fragment, useEffect, useState } from "react"
import { Container, Button, Form, Row, Col, Tabs, Tab } from "react-bootstrap"
import { getSpecialtyAll } from "../services/specialtyService"
import { days } from "../constants/date"
import { getTimetableBySpecialty } from "../services/timetableService"
import { getScheduleBySpecialty, saveSchedule } from "../services/scheduleService"
import Consultations from "./tables/consultations"


type childrenProps = {

}

const Schedule = ({}: childrenProps) => {

  //#region [ VARIABLES ]

  const daysWeek = days
  const [rows, setRows] = useState<any[]>([])
  const [listSpecialties, setListSpecialties] = useState<any[]>([])
  const [currentDate, setCurrentDate] = useState<string>(new Date().toLocaleString('en-us', {year: 'numeric', month: '2-digit', day: '2-digit'}).replace(/(\d+)\/(\d+)\/(\d+)/, '$3-$1-$2'))
  const [selectedSpecialty, setSelectedSpecialty] = useState<any>(0)


  //#endregion

  //#region [ EFFECTS ]

    useEffect(() => {
      getAllSpecialties()
    }, [])

    useEffect(() => {
      if(listSpecialties && listSpecialties.length && listSpecialties.length > 0){
        getRows()
      }
    }, [currentDate, listSpecialties])

  //#endregion

  //#region [ METHODS ]

    const getAllSpecialties = async () => {
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
      const result = await getScheduleBySpecialty(payload)
      if(result && result.length && result.length > 0){
        setRows(result)
      }
    }

    const getTimes = async () => {
      const id_specialty: number[] = selectedSpecialty != 0 ? [parseInt(selectedSpecialty)] : listSpecialties.map((item: any) => item.Id)
      const dayWeekSelected = daysWeek[new Date(currentDate).getDay()]
      const payload = {
        Id: id_specialty,
        Day: dayWeekSelected
      }
      return await getTimetableBySpecialty(payload)
    }

    const generateCalendar = async () => {
      const times = await getTimes()
      if(!(times && times.length && times.length > 0)){
        return
      }

      const items: any[] = []
      times.map((element: any) => {
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

      const payload = {
        Items: items
      }
      const result = await saveSchedule(payload)
      if(result){
        getRows()
      }
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

  //#endregion

  //#region [ PROPERTIES ]

  //#endregion

  //#region [ RENDER ]

    return (
      <Fragment>
        <Container fluid>
          <div className="d-flex bd-highlight mb-3">
            <div className="me-auto p-2 bd-highlight">
              <h1>Calendario</h1>
            </div>
            <div className="p-2 bd-highlight">
            </div>
          </div>
          <hr/>

          <Form>
            <Row>
              {/* <Col sm="3">
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
              </Col> */}
              <Col sm="2">
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                  <Form.Label>Fecha</Form.Label>
                  <Form.Control type="date" value={ currentDate } onChange={ handleChangeDate } />
                </Form.Group>
              </Col>
              {
                (!rows || rows.length == 0) &&
                  <Col sm="1">
                    <div className="mt-4 p-2">
                      <Button variant="primary" onClick={ generateCalendar }>Generar</Button>{' '}
                    </div>
                  </Col>
              }
            </Row>


          </Form>


          <Tabs defaultActiveKey="profile" className="mb-3">
            {
              listSpecialties.map((item: any, index: number) =>
                <Tab key={ index } eventKey={ item.Id } title={ item.Nombre }>
                  <Consultations dataList={ getBySpecialty(item.Id) } />
                </Tab>
              )
            }
          </Tabs>

        </Container>

      </Fragment>
    )

  //#endregion

}

export default Schedule