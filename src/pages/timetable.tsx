import { Fragment, useEffect, useState } from "react"
import { Container, Button, Form, Row, Col, Tabs, Tab } from "react-bootstrap"
import { getOfficeAll } from "../services/officeService"
import { getSpecialtyAll } from "../services/specialtyService"


type childrenProps = {

}

const Timetable = ({}: childrenProps) => {

  //#region [ VARIABLES ]

  const [listOffices, setListOffices] = useState<any[]>([])
  const [listSpecialties, setListSpecialties] = useState<any[]>([])
  const [currentDate, setCurrentDate] = useState<string>(new Date().toLocaleString('en-us', {year: 'numeric', month: '2-digit', day: '2-digit'}).replace(/(\d+)\/(\d+)\/(\d+)/, '$3-$1-$2'))
  //#endregion

  //#region [ EFFECTS ]

    useEffect(() => {
      getAllSpecialties()
      getAllOffices()
    }, [])


  //#endregion

  //#region [ METHODS ]

    const getAllSpecialties = async () => {
      const result = await getSpecialtyAll()
      if(result && result.length && result.length > 0){
        result.splice(0, 1)
        setListSpecialties(result)
      }
    }

    const getAllOffices = async () => {
      const result = await getOfficeAll()
      if(result && result.length && result.length > 0){
        setListOffices(result)
      }
    }

  //#endregion

  //#region [ EVENTS ]

    const handleChangeDate = (event: any) => {
      setCurrentDate(event.target.value)
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
              <Col sm="3">
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                  <Form.Label>Especialidad</Form.Label>
                  <Form.Select aria-label="Default select example">
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
              <Col sm="1">
                <div className="mt-4 p-2">
                  <Button variant="primary" onClick={ () => null }>Generar</Button>{' '}
                </div>
              </Col>
            </Row>


          </Form>


          <Tabs defaultActiveKey="profile" className="mb-3">
            {
              listSpecialties.map((item: any) =>
                <Tab eventKey={ item.Id } title={ item.Nombre }>
                  Tab content for me
                </Tab>
              )
            }
          </Tabs>

        </Container>

      </Fragment>
    )

  //#endregion

}

export default Timetable