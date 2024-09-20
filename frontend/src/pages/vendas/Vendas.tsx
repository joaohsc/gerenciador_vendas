import { Container } from "react-bootstrap";
import MainBreadcrumb from "../../components/Breadcrumb";
import MainNavbar from "../../components/MainNavbar";
import ListTitlePage from "../../components/ListTitlePage";
import VendasTable from "../../components/tables/VendasTable";

function Vendas() {
  return (
    <div>
      <MainNavbar />
      <Container>
        <ListTitlePage
          title="Lista de vendas"
          urlCadastro="/vendas/cadastro"
        />
        <MainBreadcrumb urlAnterior={""} urlAtual={"Vendas"} />
        <VendasTable route={"/vendas"} />
      </Container>
    </div>
  );
}

export default Vendas;
