import { Card } from 'react-bootstrap'

export const ColumnCard = ({ hour }: { hour: string}) => {
  return (
    <Card className="p-0 m-1" style={{ width: '15rem', height: '3rem', backgroundColor: '#DCDCDC', border: 'none' }}>
    <Card.Body>
      <Card.Title className="text-center">{ hour }</Card.Title>
    </Card.Body>
  </Card>
  )
}