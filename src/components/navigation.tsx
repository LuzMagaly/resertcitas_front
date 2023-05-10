import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faAlignLeft } from "@fortawesome/free-solid-svg-icons"
import { Navbar, Button, Nav } from "react-bootstrap"
import { Link } from "react-router-dom"

const Navigation = ({ toggle }: { toggle: any }) => {
  return (
    <Navbar
        bg="light"
        className="navbar shadow-sm p-3 mb-5 bg-white rounded"
        expand
      >
        <Button variant="outline-info" onClick={ toggle }>
          <FontAwesomeIcon icon={faAlignLeft} />
        </Button>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="ms-auto" navbar>
            <Link to="profile" className="text-muted">Username</Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
  )
}

export default Navigation