import { Fragment } from "react"
import { AppointmentCard } from "pages/medical/appointmentCard"
import { Row } from "react-bootstrap"

type childrenProps = {
    dataList: any[]
}

export const Consultations = ({ dataList }: childrenProps) => {

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