import { Fragment, useState, useEffect } from 'react'
import { Container, Button, Card, Col, Row, Image } from 'react-bootstrap'
import { getSpecialtyAll } from '../../services/specialtyService'
import { Loading } from 'components/alerts/loading'

export const Home = () => {
  const [specialties, setSpecialties] = useState<[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
      loadSpecialty()
  }, [])

  const loadSpecialty = async () => {
    setLoading(true)
    const result: any = await getSpecialtyAll() || []
    setLoading(false)
    setSpecialties(result)
}

  const bgColor = 'secondary'
  return (
    <Fragment>

    <Container fluid>
      <div className="d-flex bd-highlight mb-0">
        <div className="me-auto p-0 bd-highlight">
          <h1>Separar una nueva cita</h1>
        </div>
        <div className="p-0 bd-highlight">
        </div>
      </div>
      <hr/>
      <div>
        <Row>
        {
          specialties.map((item: any, index: number) =>
            <Col key={ index } lg="2" md="3" sm="6" className="mb-4">
              <Card className="bg-white text-white">
                <Card.Img src="https://previews.123rf.com/images/terrry4/terrry41904/terrry4190401193/121489072-iconos-web-m%C3%A9dicos-y-de-salud-en-estilo-de-l%C3%ADnea-medicina-y-salud-rx-infograf%C3%ADa-ilustraci%C3%B3n.jpg" alt="Card image" />
                <Card.ImgOverlay className='bg-dark'>
                  <Card.Title>{ item.Nombre }</Card.Title>
                  <Card.Text>{ item.Descripcion }</Card.Text>
                </Card.ImgOverlay>
              </Card>
            </Col>
          )
        }
        </Row>
      </div>
    </Container>

    <br/>
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
                <Image className='rounded-start border-0' fluid src="data:image/png;base64,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" />
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
    {
      !!loading &&
      <Loading show={ loading } />
    }

  </Fragment>
  )
}