import { Col, Row } from "react-bootstrap";

type titleRequest = {
  title: string;
  urlCadastro: string;
};
function ListTitlePage({ title, urlCadastro }: titleRequest) {
  return (
    <Row className="p-2 justify-content-between">
      <Col lg="3">
        <h3>{title}</h3>
      </Col>
      <Col lg="1">
        <a href={urlCadastro}>
          <button className="b-main-button">Cadastro</button>
        </a>
      </Col>
    </Row>
  );
}

export default ListTitlePage;
