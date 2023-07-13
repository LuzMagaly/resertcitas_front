import { Fragment } from 'react'
import { Container, Button, Card, Col, Row } from 'react-bootstrap'
import { ShowAppointmentsGeneral } from './showAppointmentsGeneral'

export const Home = () => {

  const bgColor = 'secondary'
  return (
    <Fragment>

      <ShowAppointmentsGeneral />
    
    <br/>

    <Container fluid>
      <div className="d-flex bd-highlight mb-0">
        <div className="me-auto p-0 bd-highlight">
          <h1>Mis citas</h1>
        </div>
        <div className="p-0 bd-highlight">
        </div>
      </div>
      <hr/>
      <div>
        <Card
            bg={ bgColor.toLowerCase() }
            text={ bgColor.toLowerCase() === 'light' ? 'dark' : 'white'}
            style={{ width: '30rem' }}
            className="mb-2"
          >
            <Row>
              <Col>
              </Col>
              <Col>
                <Card.Header>Cardiología</Card.Header>
                <Card.Body>
                  <Card.Title>Fecha / Hora</Card.Title>
                  <Card.Text>
                    <span>Consultorio</span><br/>
                    <span>Estado</span><br/>

                  </Card.Text>
                  <Button variant="danger">Anular</Button>
                </Card.Body>
              </Col>
            </Row>
          </Card>
      </div>
    </Container>

  </Fragment>
  )
}