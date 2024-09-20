import { Container } from "react-bootstrap";
import MainBreadcrumb from "../../components/Breadcrumb";
import MainNavbar from "../../components/MainNavbar";
import FormVenda from "../../components/FormVenda";

function PedidosCadastro() {
  return (
    <div>
      <MainNavbar />
      <Container>
        <MainBreadcrumb
          urlAnterior={"pedidos"}
          urlAtual={"Cadastro de pedido"}
        />
        <FormVenda route={"/pedidos"} method={"pedido"}></FormVenda>
      </Container>
    </div>
  );
}

export default PedidosCadastro;
