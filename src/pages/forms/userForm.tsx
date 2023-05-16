import { Col, Form, Row, Image, Button } from 'react-bootstrap'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faTimes } from '@fortawesome/free-solid-svg-icons'

const UserForm = () => {
  return (
    <Form>
        <div className="mx-auto" style={{ height: '255px', width: '255px', maxHeight: '255px', maxWidth: '255px' }}>
            <div className='position-relative'>
                <div className="position-absolute top-0 start-0">
                <Button variant="secondary">
                    <FontAwesomeIcon icon={ faTimes } color='secondary'/>
                </Button>
                </div>
            </div>
            <div className="border border-secondary border-5 rounded rounded-circle" >
                <div className="m-2">
                    <Image className="rounded rounded-circle" fluid src="https://img.freepik.com/vector-gratis/ejemplo-lindo-icono-vector-historieta-hombre-barba-concepto-icono-familia-personas-aislado-vector-premium-estilo-dibujos-animados-plana_138676-3757.jpg?w=2000" />
                </div>
            </div>
        </div>

        <Row>
            <Col sm="8">
                <Form.Group className="mb-3" >
                    <Form.Label>Nombres</Form.Label>
                    <Form.Control type="text" placeholder="Ingrese sus nombres completos" autoFocus />
                </Form.Group>
            </Col>
            <Col sm="4">
                <Form.Group className="mb-3">
                    <Form.Label>DNI</Form.Label>
                    <Form.Control type="text" placeholder="XXXXXXXX" />
                </Form.Group>
            </Col>
        </Row>

        <Row>
            <Col sm="6">
                <Form.Group className="mb-3">
                    <Form.Label>Apellido paterno</Form.Label>
                    <Form.Control type="text" placeholder="Ingrese su apellido paterno" />
                </Form.Group>
            </Col>
            <Col sm="6">
                <Form.Group className="mb-3">
                    <Form.Label>Apellido materno</Form.Label>
                    <Form.Control type="text" placeholder="Ingrese su apellido materno" />
                </Form.Group>
            </Col>
        </Row>

        <Row>
            <Col sm="8">
                <Form.Group className="mb-3">
                    <Form.Label>Fecha de nacimiento</Form.Label>
                    <Form.Control type="date" placeholder="DD/MM/YYYY" />
                </Form.Group>
            </Col>
            <Col sm="4">
                <Form.Group className="mb-3">
                    <Form.Label>Sexo</Form.Label>
                    <Form.Select aria-label="Default select example">
                        <option>Seleccionar</option>
                        <option value="1">Masculino</option>
                        <option value="2">Femenino</option>
                    </Form.Select>
                </Form.Group>
            </Col>
        </Row>

        <Form.Group className="mb-3">
            <Form.Label>Dirección</Form.Label>
            <Form.Control type="text" placeholder="Ingrese su dirección" />
        </Form.Group>

        <Form.Group className="mb-3">
            <Form.Label>Correo electrónico</Form.Label>
            <Form.Control type="email" placeholder="mi_email@email.com" />
        </Form.Group>
    </Form>
  )
}

export default UserForm