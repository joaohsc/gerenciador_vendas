import { Container } from "react-bootstrap";
import MainBreadcrumb from "../../components/Breadcrumb";
import MainNavbar from "../../components/MainNavbar";
import FormVenda from "../../components/FormVenda";

function VendasCadastro() {
  return (
    <div>
      <MainNavbar />
      <Container>
        <MainBreadcrumb
          urlAnterior={"vendas"}
          urlAtual={"Cadastro de vendas"}
        />
        <FormVenda route={"/vendas"} method={"vendas"}></FormVenda>
      </Container>
    </div>
  );
}

export default VendasCadastro;
