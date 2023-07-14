import { Fragment } from "react"
import { AppointmentCard } from "pages/medical/appointmentCard"
import { Row } from "react-bootstrap"

type childrenProps = {
    dataList: any[],
    onClick?: any
}

export const Consultations = ({ dataList, onClick }: childrenProps) => {

    return (
        <Fragment>
            <Row>
            {
                dataList.map((item: any, index: number) =>
                    <AppointmentCard value={ item } key={ index } onClick={ onClick }/>
                )
            }
            </Row>
        </Fragment>
    )
}