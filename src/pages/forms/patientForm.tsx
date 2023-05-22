import { Col, Form, Row, Image, Button } from 'react-bootstrap'

const PatientForm = () => {
  return (
    <Form>
        <Row>
            <Col sm="6">
                <Form.Group className="mb-3">
                    <Form.Label>Tiene alergias</Form.Label>
                    <Form.Select aria-label="Default select example">
                        <option>Seleccionar</option>
                        <option value="Si">Si</option>
                        <option value="No">No</option>
                    </Form.Select>
                </Form.Group>
            </Col>
            <Col sm="6">
                <Form.Group className="mb-3">
                    <Form.Label>Donación de órganos</Form.Label>
                    <Form.Select aria-label="Default select example">
                        <option>Seleccionar</option>
                        <option value="Si">Si</option>
                        <option value="No">No</option>
                    </Form.Select>
                </Form.Group>
            </Col>
        </Row>

        <Form.Group className="mb-3">
            <Form.Label>Alergias</Form.Label>
            <Form.Control type="text" placeholder="Escriba todas sus alergias" />
        </Form.Group>

        <Row>
            <Col sm="6">
                <Form.Group className="mb-3">
                    <Form.Label>Tipo de sangre</Form.Label>
                    <Form.Select aria-label="Default select example">
                        <option>Seleccionar</option>
                        <option value="A">A</option>
                        <option value="B">B</option>
                        <option value="AB">AB</option>
                        <option value="O">O</option>
                    </Form.Select>
                </Form.Group>
            </Col>
            <Col sm="6">
                <Form.Group className="mb-3">
                    <Form.Label>Factor RH</Form.Label>
                    <Form.Select aria-label="Default select example">
                        <option>Seleccionar</option>
                        <option value="+">+</option>
                        <option value="-">-</option>
                    </Form.Select>
                </Form.Group>
            </Col>
        </Row>

        <Form.Group className="mb-3">
            <Form.Label>Contacto de emergencia</Form.Label>
            <Form.Control type="text" placeholder="Nombres y apellidos de la persona" />
        </Form.Group>

        <Row>
            <Col sm="6">
                <Form.Group className="mb-3">
                    <Form.Label>Numero de emergencia 1</Form.Label>
                    <Form.Control type="text" placeholder="Ingrese un número de algún familiar" />
                </Form.Group>
            </Col>
            <Col sm="6">
                <Form.Group className="mb-3">
                    <Form.Label>Numero de emergencia 2</Form.Label>
                    <Form.Control type="text" placeholder="Ingrese un número de algún familiar" />
                </Form.Group>
            </Col>
        </Row>

    </Form>
  )
}

export default PatientForm