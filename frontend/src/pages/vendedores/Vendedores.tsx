import { Container } from "react-bootstrap";
import MainBreadcrumb from "../../components/Breadcrumb";
import ListTitlePage from "../../components/ListTitlePage";
import MainNavbar from "../../components/MainNavbar";
import VendedoresTable from "../../components/tables/VendedoresTable";

function Vendedores() {
  return (
    <div>
      <MainNavbar />
      <Container>
        <MainBreadcrumb urlAnterior={""} urlAtual={"Vendedores"} />
        <ListTitlePage
          title="Lista de vendedores"
          urlCadastro="/vendedores/cadastro"
        />
        <VendedoresTable route="/vendedores" />
      </Container>
    </div>
  );
}

export default Vendedores;
