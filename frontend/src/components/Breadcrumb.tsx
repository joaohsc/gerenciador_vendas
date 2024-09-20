import { Row } from "react-bootstrap";
import Breadcrumb from "react-bootstrap/Breadcrumb";

type URL = {
  urlAtual: string;
  urlAnterior: string;
};
function MainBreadcrumb({ urlAtual, urlAnterior }: URL) {
  return (
    <Row className="p-2 justify-content-between"> 
      <Breadcrumb>
        <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
        {urlAnterior !== "" ? (
          <Breadcrumb.Item href={"/" + urlAnterior}>
            {urlAnterior}
          </Breadcrumb.Item>
        ) : null}
        <Breadcrumb.Item active>{urlAtual}</Breadcrumb.Item>
      </Breadcrumb>
    </Row>
  );
}

export default MainBreadcrumb;
