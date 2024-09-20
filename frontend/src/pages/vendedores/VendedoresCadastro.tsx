import { Container } from "react-bootstrap";
import MainBreadcrumb from "../../components/Breadcrumb";
import FormRegister from "../../components/FormRegistro";
import MainNavbar from "../../components/MainNavbar";

function VendedoresCadastro() {
  return (
    <div>
      <MainNavbar />
      <Container>
        <MainBreadcrumb
          urlAnterior={"vendedores"}
          urlAtual={"Cadastro de vendedores"}
        />
        <FormRegister route="/vendedores" method="vendedor" />
      </Container>
    </div>
  );
}

export default VendedoresCadastro;
