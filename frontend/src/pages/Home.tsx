import { Col, Container, Row, Stack } from "react-bootstrap";
import MainNavbar from "../components/MainNavbar";

function Home() {
  return (
    <div>
      <MainNavbar />
      <Container>
        <Row className="justify-content-md-center">
          <Col lg="5" className="m-4">
            <Stack gap={2}>
              <h1>Página Inicial</h1>
              <p>Seja bem vindo(a)! Esse é o sitema de gerenciamento de vendas. Se atente as regras de venda. Uma venda só pode
                ser cadastrada se não ultrapassar o desconto máximo permitido.
              </p>              
            </Stack>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Home;
