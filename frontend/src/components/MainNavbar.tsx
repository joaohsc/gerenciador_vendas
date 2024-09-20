import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import "../styles/main.css";

function MainNavbar() {
  return (
    <Navbar expand="lg" className="bg-main-color" data-bs-theme="dark">
      <Container>
        <Navbar.Brand href="/">
          <img
            src="/src/assets/seubone.svg"
            width="30"
            height="30"
            className="d-inline-block align-top"
            alt="seubone logo"
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="nav-main-content justify-content-between">
            <Nav>
              <Nav.Link href="/">Home</Nav.Link>
              <Nav.Link href="/vendas">Vendas</Nav.Link>
              <Nav.Link href="/pedidos">Pedidos</Nav.Link>
              <Nav.Link href="/vendedores">Vendedores</Nav.Link>
            </Nav>
            <Nav>
              <Nav.Link  href="/logout">
                <button className="custom-button">Logout</button>
              </Nav.Link>
            </Nav>
            
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default MainNavbar;
