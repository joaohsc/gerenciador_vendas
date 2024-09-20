import api from "../api";
import { useForm, SubmitHandler } from "react-hook-form";
import "../styles/form.css";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Stack from "react-bootstrap/Stack";
import Col from "react-bootstrap/Col";

enum roleEnum {
  seller = "seller",
  manager = "manager",
}

interface FormRequest {
  route: string;
  method: string;
}
type Inputs = {
  username: string;
  password: string;
  email: string;
  role: roleEnum;
};

function FormRegister({ route, method }: FormRequest) {
  const { register, handleSubmit, reset } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (data, e) => {
    e?.preventDefault();

    try {
      const res = await api.post(route, {
        username: data.username,
        password: data.password,
        email: data.email,
        role: data.role,
      });
      alert("Cadastro realizado com sucesso!");
      reset();
    } catch (error) {
      alert(error);
    }
  };
  const formTitle: string =
    method === "register" ? "Registro" : "Registro de vendedor";

  return (
    <Container>
      <Row className="justify-content-md-center">
        <Col lg="5">
          <form onSubmit={handleSubmit(onSubmit)} className="form-container">
            <Stack gap={3}>
              <h1>{formTitle}</h1>
              <label>Nome</label>
              <input className="form-input" {...register("username")} />
              <label>Senha</label>
              <input type="password" className="form-input" {...register("password")} />
              <label>Email</label>
              <input className="form-input" {...register("email")} />

              {method === "register" ? (
                <div>
                  <select {...register("role")}>
                    <option value="seller">Vendedor</option>
                    <option value="manager">Gerente</option>
                  </select>
                </div>
              ) : null}

              <Button variant="primary" className="form-button" type="submit">
                Cadastrar
              </Button>
              {method === "register" ? (
                <a href="/login">Fazer o login</a>
              ) : null}
              
            </Stack>
          </form>
        </Col>
      </Row>
    </Container>
  );
}

export default FormRegister;
