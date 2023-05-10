import { Col, Form, Row } from 'react-bootstrap'

const UserForm = () => {
  return (
    <Form>
        <Row>
            <Col sm="8">
                <Form.Group className="mb-3">
                    <Form.Label>DNI</Form.Label>
                    <Form.Control type="number" placeholder="XXXXXXXX" autoFocus />
                </Form.Group>
            </Col>
            <Col sm="4">
                <Form.Group className="mb-3">
                    <Form.Label>ID</Form.Label>
                    <Form.Control type="text" placeholder="Código" autoFocus />
                </Form.Group>
            </Col>
        </Row>

        <Form.Group className="mb-3" >
            <Form.Label>Nombres</Form.Label>
            <Form.Control type="text" placeholder="Ingrese sus nombres completos" autoFocus />
        </Form.Group>
        <Form.Group className="mb-3">
            <Form.Label>Apellido paterno</Form.Label>
            <Form.Control type="text" placeholder="Ingrese su apellido paterno" autoFocus />
        </Form.Group>
        <Form.Group className="mb-3">
            <Form.Label>Apellido materno</Form.Label>
            <Form.Control type="text" placeholder="Ingrese su apellido materno" autoFocus />
        </Form.Group>

        <Form.Group className="mb-3">
            <Form.Label>Fecha de nacimiento</Form.Label>
            <Form.Control type="date" placeholder="DD/MM/YYYY" autoFocus />
        </Form.Group>





        <Form.Group className="mb-3">
            <Form.Label>Label</Form.Label>
            <Form.Control type="text" placeholder="Placeholder" autoFocus />
        </Form.Group>


        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="name@example.com" autoFocus />
        </Form.Group>

        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1" >
            <Form.Label>Example textarea</Form.Label>
            <Form.Control as="textarea" rows={3} />
        </Form.Group>

    </Form>
  )
}

export default UserForm