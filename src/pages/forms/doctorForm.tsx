import { useEffect, useState } from 'react'
import { Col, Form, Row, Image, Button } from 'react-bootstrap'
import { specialtyService } from '../../services/specialtyService'

const DoctorForm = () => {

    const [specialties, setSpecialties] = useState<[]>([])

    useEffect(() => {
        loadSpecialty()
    }, [])

    const loadSpecialty = async () => {
        const result: any = await specialtyService() || []
        console.log(result)
        setSpecialties(result)
    }

  return (
    <Form>
      <Row>
          <Col sm="6">
              <Form.Group className="mb-3">
                  <Form.Label>CMP</Form.Label>
                  <Form.Control type="text" placeholder="Colegio de Médicos del Perú" />
              </Form.Group>
          </Col>
          <Col sm="6">
              <Form.Group className="mb-3">
                  <Form.Label>Especialidad</Form.Label>
                  <Form.Select aria-label="Default select example">
                      <option>Seleccionar</option>
                      {
                        specialties.map((item: any, index: number) =>
                            <option key={ index } value={ item.Id }>{ item.Nombre }</option>
                        )
                      }
                  </Form.Select>
              </Form.Group>
          </Col>
      </Row>

      <Form.Group className="mb-3">
          <Form.Label>Grado de instrucción</Form.Label>
          <Form.Control type="text" placeholder="Bachiller, Magister, Doctor" />
      </Form.Group>
  </Form>
  )
}

export default DoctorForm