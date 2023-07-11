import { Fragment, useState, useEffect } from 'react'
import { Container, Button, Card, Col, Row, Image, Form } from 'react-bootstrap'
import { getSpecialtyAll } from '../../services/specialtyService'
import { Loading } from 'components/alerts/loading'
import { getScheduleBySpecialty } from 'services/scheduleService'
import 'styles/specialty.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { style_specialty } from 'constants/specialties'

export const Home = () => {

  const [currentDate, setCurrentDate] = useState<string>(new Date().toLocaleString('en-us', {year: 'numeric', month: '2-digit', day: '2-digit'}).replace(/(\d+)\/(\d+)\/(\d+)/, '$3-$1-$2'))
  const [apointments, setApointments] = useState<[]>([])
  const [specialties, setSpecialties] = useState<[]>([])
  const [rowsSpecialty, setRowsSpecialty] = useState<any[]>([])
  const [loading, setLoading] = useState(false)

  const styles_specialties = style_specialty

  useEffect(() => {
      loadSchedules()
      //loadSpecialty()
  }, [currentDate])

  const loadSchedules = async () => {
    const id_specialty = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13]
    const date = new Date(currentDate)
    const payload = {
      Id: id_specialty,
      Fecha: date
    }
    setLoading(true)
    const result = await getScheduleBySpecialty(payload)
    console.log(result)
    if(result && result.length && result.length > 0){
      extractSpecialtiesFromRows(result)
      setApointments(result)
    }
    else{
      setRowsSpecialty([])
      setApointments([])
    }
    setLoading(false)
    
  }

  const loadSpecialty = async () => {
    setLoading(true)
    const result: any = await getSpecialtyAll() || []
    console.log(result)
    setLoading(false)
    setSpecialties(result)
  }

  const extractSpecialtiesFromRows = (items: any[]) => {
    const tempSpecialties: any[] = items.map((item: any) => {
      return {
        Id: item.Medicos.Id_Especialidad,
        Nombre: item.Medicos.Especialidades.Nombre,
        Descripcion: item.Medicos.Especialidades.Descripcion
      }
    })
    const specialtiesDistinct = tempSpecialties.filter((n: any, i: any) => tempSpecialties.findIndex((item: any) => item.Id == n.Id) === i)
    setRowsSpecialty(specialtiesDistinct)
  }

  const handleChangeDate = (event: any) => {
    setCurrentDate(event.target.value)
  }

  const bgColor = 'secondary'
  return (
    <Fragment>

    <Container fluid>
      <div className="d-flex">
        <div className="me-auto">
          {/* <h4>Separar una nueva cita</h4> */}
        </div>
      </div>
      <Form>
        <Row>
          <Col sm="3">
            <Form.Group className="mb-3">
              <Form.Label>Fecha (Solo para test)</Form.Label>
              <Form.Control type="date" value={ currentDate } onChange={ handleChangeDate } />
            </Form.Group>
          </Col>
        </Row>
      </Form>
      <hr/>
      <div className='row'>
        {
          rowsSpecialty.map((item: any, index: number) =>
            <div key={ index } className="col-auto p-1 m-1">
              <div className={ `card ${ styles_specialties[item.Id - 1].class }` }>
                <div className="overlay"></div>
                <div className="circle">
                  <FontAwesomeIcon icon={ styles_specialties[item.Id - 1].icon } size="2x"/>
                </div>
                <p>{ item.Nombre }</p>
                <small>3 citas disponibles</small>
              </div>
            </div>
          )
        }
      </div>
    </Container>

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
    {
      !!loading &&
      <Loading show={ loading } />
    }

  </Fragment>
  )
}

{/* 
  | "2xs"
  | "xs"
  | "sm"
  | "lg"
  | "xl"
  | "2xl"
  | "1x"
  | "2x" */}

{/* 
	
person-breastfeeding / pregnant		Ginecologia y obstetricia		
			
ear		otorinolaringologia			
 */}

/*
[
  {
      "Id": 1,
      "Nombre": "Urgencias",
      "Descripcion": "Atención rápida para casos de gravedad",
      "Estado": "Activo"
  },
  {
      "Id": 2,
      "Nombre": "Medicina general",
      "Descripcion": "Diagnóstico general",
      "Estado": "Activo"
  },
  {
      "Id": 3,
      "Nombre": "Odontología",
      "Descripcion": "Cuidado de los dientes y salud bucal",
      "Estado": "Activo"
  },
  {
      "Id": 4,
      "Nombre": "Psicología",
      "Descripcion": "Cuidado de la salud mental",
      "Estado": "Activo"
  },
  {
      "Id": 5,
      "Nombre": "Pediatría",
      "Descripcion": "Cuidado del niño",
      "Estado": "Activo"
  },
  {
      "Id": 6,
      "Nombre": "Ginecología y obstetricia",
      "Descripcion": "Cuidado de la salud reproductora",
      "Estado": "Activo"
  },
  {
      "Id": 7,
      "Nombre": "Oftalmología",
      "Descripcion": "Cuidado de la vista",
      "Estado": "Activo"
  },
  {
      "Id": 8,
      "Nombre": "Otorrinolaringología",
      "Descripcion": "Salud auditiva",
      "Estado": "Activo"
  },
  {
      "Id": 9,
      "Nombre": "Cardiología",
      "Descripcion": "Diagnóstico de problemas del corazón",
      "Estado": "Activo"
  },
  {
      "Id": 10,
      "Nombre": "Oncología",
      "Descripcion": "Detección de cáncer",
      "Estado": "Activo"
  },
  {
      "Id": 11,
      "Nombre": "Rehabilitación",
      "Descripcion": "Terapias de recuperación",
      "Estado": "Activo"
  },
  {
      "Id": 12,
      "Nombre": "Laboratorios clínicos",
      "Descripcion": "Análisis y diagnóstico",
      "Estado": "Activo"
  },
  {
      "Id": 13,
      "Nombre": "Radiología",
      "Descripcion": "Rayos X",
      "Estado": "Activo"
  }
]*/