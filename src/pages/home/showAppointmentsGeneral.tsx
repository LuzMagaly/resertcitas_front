//#region [ IMPORTS ]

    import { Fragment, useEffect, useState } from 'react'
    import io from 'socket.io-client'
    import { Container, Row, Col, Form } from 'react-bootstrap'
    import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
    import { Loading } from 'components/alerts/loading'
    import { CreateModal } from 'pages/home/createModal'
    import { style_specialty } from 'constants/specialties'
    import { url } from "server/api"
    import { getScheduleBasicBySpecialty } from 'services/scheduleService'
    import 'styles/specialty.css'

//#endregion

//This components usign unique sockets
export const ShowAppointmentsGeneral = () => {
    
    //#region [ VARIABLES ]

        const socket = io(url)
        const [currentDate, setCurrentDate] = useState<string>(new Date().toLocaleString('en-us', {year: 'numeric', month: '2-digit', day: '2-digit'}).replace(/(\d+)\/(\d+)\/(\d+)/, '$3-$1-$2'))
        const [rowsSpecialty, setRowsSpecialty] = useState<any[]>([])
        const [loading, setLoading] = useState(false)
        const [showCreate, setShowCreate] = useState(false)
        const [params, setParams] = useState<any>(null)
        const styles_specialties = style_specialty
    
    //#endregion

    //#region [ EFECTS ]
    
        useEffect(() => {
            //socket.emit('GET', 'Message from the client connect tto the socket')
            getRows()
        }, [currentDate])  

    //#endregion

    //#region [ SOCKETS ]

        socket.on('CallBackAfterInsertAppointmentBasic', (response: any) => {
            console.log('Event reader from server!')
            console.log(response)
            loadSchedules(JSON.parse(response))
        })

    //#endregion

    //#region [ FUNCTIONS ]

        const getRows = async () => {
            //only get the specialty, and the count of the avalaibles appointments
            const id_specialty = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13]
            const date = new Date(currentDate)
            const payload = {
                Id: id_specialty,
                Fecha: date
            }
            setLoading(true)
            const result = await getScheduleBasicBySpecialty(payload)
            setLoading(false)
            loadSchedules(result)
        }

        const loadSchedules = async (result: any) => {
            if(result && result.length && result.length > 0){
                setRowsSpecialty(result)
            }
            else{
                setRowsSpecialty([])
            }
        }

    //#endregion

    //#region [ EVENTS ]

        const handleChangeDate = (event: any) => {
            setCurrentDate(event.target.value)
        }

        const initializeAppointment = (id: any) => {
            const date = new Date(currentDate)
            const payload = {
                Id: [id],
                Fecha: date
            }
            setParams(payload)
            setShowCreate(true)
        }

    //#endregion

    //#region [ PROPERTIES ]

    //#endregion

    //#region [ RENDER ]

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
                        <div key={ index } className="col-auto p-1 m-1" onClick={ () => initializeAppointment(item.Id_Especialidad) }>
                        <div className={ `card ${ styles_specialties[item.Id_Especialidad - 1].class }` }>
                            <div className="overlay"></div>
                            <div className="circle">
                            <FontAwesomeIcon icon={ styles_specialties[item.Id_Especialidad - 1].icon } size="2x"/>
                            </div>
                            <p>{ item.Nombre }</p>
                            <small>{ item.Citas } citas disponibles</small>
                        </div>
                        </div>
                    )
                    }
                </div>
                </Container>
                {
                !!loading &&
                <Loading show={ loading } />
                }
                {
                !!showCreate &&
                <CreateModal show={ showCreate } handleClose={ () => setShowCreate(false) } params={ params } socket={ socket }/>
                }
            </Fragment>
        )
    
    //#endregion

}
