import { Col, Container, Row, Stack } from "react-bootstrap";
import MainNavbar from "../../components/MainNavbar";

function Forbidden() {
  return (
    <div>
      <MainNavbar />
      <Container>
        <Row className="justify-content-md-center">
          <Col lg="5" className="m-4">
            <Stack gap={2}>
              <h1>Página não autorizada!</h1>
              <p>
               Você precisa ter permissão de gerência para acessar essa página.
              </p>
            </Stack>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Forbidden;
