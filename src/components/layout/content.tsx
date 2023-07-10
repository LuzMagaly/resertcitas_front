import { Container } from "react-bootstrap";
import { Navigation } from 'components/layout/navigation'

export const Content = ({ toggle, isOpen, children }: { toggle: any, isOpen: any, children: any }) => {
  return (
    <Container fluid className={ `content ${isOpen && 'is-open'}`} >
        <Navigation toggle={ toggle } />
        { children }
      </Container>
  )
}