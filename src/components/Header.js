import { Badge, Button, Container, Form, Nav, Navbar, NavDropdown, Row } from 'react-bootstrap';

const Header = ({ handleShow, totalItems }) => {
  return (
    <Row>
      <Navbar expand="lg" className="bg-body-tertiary">
        <Container fluid>
          <Navbar.Brand href="#">Pizza House</Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav className="me-auto my-2 my-lg-0" navbarScroll>
              <Nav.Link href="#home">Home</Nav.Link>
              <Nav.Link href="#about">About Us</Nav.Link>
              <NavDropdown title="Contact Us" id="navbarScrollingDropdown">
                <NavDropdown.Item href="#phone">Phone Number</NavDropdown.Item>
                <NavDropdown.Item href="#address">Address</NavDropdown.Item>
              </NavDropdown>
            </Nav>
            <Form className="d-flex">
              <Form.Control
                type="search"
                placeholder="Search"
                className="me-2"
                aria-label="Search"
              />
              <Button variant="outline-success">Search</Button>
            </Form>
            <Button variant="primary" onClick={handleShow}>
              Items: <Badge bg="secondary">{totalItems}</Badge>
            </Button>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </Row>
  );
}

export default Header;
