import { useEffect, Fragment } from "react"
import AppointmentCard from "../cards/appointmentCard"
import { Row } from "react-bootstrap"

type childrenProps = {
    dataList: any[]
}

const Consultations = ({ dataList }: childrenProps) => {

    useEffect(() => {
        if(dataList && dataList.length && dataList.length > 0){
            //Separar por consultorios
        }
    }, [dataList])
    
    return (

        <Fragment>
            <Row>
            {
                dataList.map((item: any, index: number) => 
                    <AppointmentCard value={ item } key={ index }/>
                )
            }
            </Row>
        </Fragment>

    )
}

export default Consultations