import { Col, Form, Row, Image, Button } from 'react-bootstrap'

const PatientForm = () => {
  return (
    <Form>
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
                        <option value="A">Masculino</option>
                        <option value="B">Femenino</option>
                        <option value="AB">Femenino</option>
                        <option value="O">Femenino</option>
                    </Form.Select>
                </Form.Group>
            </Col>
            <Col sm="6">
                <Form.Group className="mb-3">
                    <Form.Label>Factor RH</Form.Label>
                    <Form.Select aria-label="Default select example">
                        <option>Seleccionar</option>
                        <option value="+">Masculino</option>
                        <option value="-">Femenino</option>
                    </Form.Select>
                </Form.Group>
            </Col>
        </Row>

        <Row>
            <Col sm="6">
                <Form.Group className="mb-3">
                    <Form.Label>Seguro</Form.Label>
                    <Form.Control type="text" placeholder="Ingrese el nombre de un seguro" />
                </Form.Group>
            </Col>
            <Col sm="6">
                <Form.Group className="mb-3">
                    <Form.Label>Código de seguro</Form.Label>
                    <Form.Control type="text" placeholder="Ingrese su código de seguro" />
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

        <Row>
            <Col sm="6">
                <Form.Group className="mb-3">
                    <Form.Label>Numero de emergencia 3</Form.Label>
                    <Form.Control type="text" placeholder="Ingrese un número de algún familiar" />
                </Form.Group>
            </Col>
            <Col sm="6">
                <Form.Group className="mb-3">
                    <Form.Label>Donación de órganos</Form.Label>
                    <Form.Select aria-label="Default select example">
                        <option>Seleccionar</option>
                        <option value="+">Si</option>
                        <option value="-">No</option>
                    </Form.Select>
                </Form.Group>
            </Col>
        </Row>

    </Form>
  )
}

export default PatientForm