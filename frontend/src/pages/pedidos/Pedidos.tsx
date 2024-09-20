import { Container } from "react-bootstrap";
import MainBreadcrumb from "../../components/Breadcrumb";
import MainNavbar from "../../components/MainNavbar";
import PedidosTable from "../../components/tables/PedidosTable";
import ListTitlePage from "../../components/ListTitlePage";

function Pedidos() {
  return (
    <div>
      <MainNavbar />
      <Container>
        <MainBreadcrumb urlAnterior={""} urlAtual={"Pedidos"} />
        <ListTitlePage
          title="Lista de pedidos"
          urlCadastro="/pedidos/cadastro"
        />
        <PedidosTable route={"/pedidos"}></PedidosTable>
      </Container>
    </div>
  );
}

export default Pedidos;
