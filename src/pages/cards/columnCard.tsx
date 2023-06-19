import { Card } from 'react-bootstrap'

const ColumnCard = ({ hour }: { hour: string}) => {
  return (
    <Card className="p-0 m-1" style={{ width: '15rem', backgroundColor: '#DCDCDC', border: 'none' }}>
    <Card.Body>
      <Card.Title className="text-center">{ hour }</Card.Title>
    </Card.Body>
  </Card>
  )
}

export default ColumnCard