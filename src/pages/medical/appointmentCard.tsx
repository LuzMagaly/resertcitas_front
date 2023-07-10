import { Col, Card } from "react-bootstrap"

type childrenProps = {
    value: any
}

export const AppointmentCard = ({ value }: childrenProps) => {

    const getHours = (value: string): string => {
        const date = new Date(value)
        return `${ date.getHours() < 10 ? '0' : '' }${ date.getHours() }:${ date.getMinutes() < 10 ? '0' : '' }${ date.getMinutes() }`
    }

    const getDates = (value: string) => {
        const date = new Date(value)
        return `${ date.getDate() < 10 ? '0' : '' }${ date.getDate() }/${ date.getMonth() + 1 < 10 ? '0' : '' }${ date.getMonth() + 1 }/${ date.getFullYear() }`
    }

    return (
        <Col lg="2" md="3" sm="6" className="mb-4">
            <Card>
                <Card.Body>
                    <Card.Title>{ `${ value.Consultorios.Nombre }, ${ value.Consultorios.Ubicacion }` }</Card.Title>
                    <Card.Text>{ `${ value.Medicos.Usuarios_Medicos_Id_UsuarioToUsuarios.Nombres } ${ value.Medicos.Usuarios_Medicos_Id_UsuarioToUsuarios.Apellido_Paterno }, ${ value.Medicos.Especialidades.Nombre }` }</Card.Text>
                    <Card.Text>{ `${ getHours(value.Hora_Inicio) } - ${ getHours(value.Hora_Fin) } / ${ value.Turno }` }</Card.Text>
                    <Card.Text>{ `${ getDates(value.Fecha) }` }</Card.Text>
                </Card.Body>
            </Card>
        </Col>
    )
}

/*

{
    "Id": 13,
    "Id_Consultorio": 4,
    "Consultorios": {
        "Nombre": "Consultorio de Psicología",
        "Ubicacion": "Piso 1",
        "Estado": "4"
    },
    "Id_Medico": 9,
    "Medicos": {
        "Usuarios_Medicos_Id_UsuarioToUsuarios": {
            "DNI": "20202020",
            "Nombres": "Rocio",
            "Apellido_Paterno": "Flores",
            "Apellido_Materno": "Carlin"
        },
        "Codigo": "123456",
        "Id_Especialidad": 4,
        "Especialidades": {
            "Nombre": "Psicología",
            "Descripcion": "Cuidado de la salud mental",
            "Estado": "Activo"
        },
        "Grado_Instruccion": "Bachiller"
    },
    "Hora_Inicio": "2020-01-01T13:00:00.000Z",
    "Hora_Fin": "2020-01-01T13:59:00.000Z",
    "Turno": "Mañana",
    "Fecha": "2023-07-08T00:00:00.000Z",
    "Estado": "ACTIVO"
}


*/