import { useEffect, useState } from 'react'
import { Card } from 'react-bootstrap'

export const ContentCard = ({ onClick, selected }: { onClick: any, selected: boolean }) => {
    const [check, setCheck] = useState<boolean>(false)

    useEffect(() => {
      setCheck(selected)
    }, [selected])

    const handleChangeState = () => {
        onClick()
        setCheck(!check)
    }

    return (
        <Card onClick={ handleChangeState } className="timetableHours p-1 m-1" style={{ width: '18rem', height: '3rem', maxHeight: '3rem', backgroundColor: check? '#53E575' : '#FFF' }}>
            <Card.Body>
                <Card.Title className="text-center"></Card.Title>
            </Card.Body>
        </Card>
    )
}