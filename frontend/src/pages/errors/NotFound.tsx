import { Container, Row, Col, Stack } from "react-bootstrap";

function NotFound() {
  return (
    <div>
      <Container>
        <Row className="justify-content-md-center">
          <Col lg="5" className="m-4">
            <Stack gap={2}>
              <h1>Página não encontrada!</h1>
              <p>
                A página procurada não existe.
              </p>
            </Stack>
            <a href="/">Voltar</a>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default NotFound;
