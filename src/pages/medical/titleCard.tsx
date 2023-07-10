import { Card } from "react-bootstrap"

export const TitleCard = ({ title }: { title: any }) => {
  return (
    <Card className="p-1 m-1" style={{ width: '18rem', backgroundColor: '#9EEFFE', border: 'none' }}>
      <Card.Body>
        <Card.Title className="text-center">{ title }</Card.Title>
      </Card.Body>
    </Card>
  )
}