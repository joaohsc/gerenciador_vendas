import api from "../api";
import { useNavigate } from "react-router-dom";
import { ACCESS_TOKEN, USER_ROLE } from "../constants";
import { useForm, SubmitHandler } from "react-hook-form";
import "../styles/form.css";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Stack from "react-bootstrap/Stack";
import Col from "react-bootstrap/Col";

interface FormRequest {
  route: string;
}

type Inputs = {
  email: string;
  password: string;
};

function Form({ route }: FormRequest) {
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (data, e) => {
    e?.preventDefault();

    try {
      const res = await api.post(route, {
        email: data.email,
        password: data.password,
      });

      localStorage.setItem(ACCESS_TOKEN, res.data.token);
      localStorage.setItem(USER_ROLE, res.data.user.role);
      
      navigate("/");
    } catch (error) {
      alert(error);
    }
  };

  return (
    <Container>
      <Row className="justify-content-md-center">
        <Col lg="5">
          <form onSubmit={handleSubmit(onSubmit)} className="form-container">
            <Stack gap={3}>
              <h1>Login</h1>
              <label>Email</label>
              <input className="form-input" {...register("email")} />
              <label>Senha</label>
              <input type="password" className="form-input" {...register("password")} />
              <Button variant="primary" className="form-button" type="submit">
                Login
              </Button>
              <a href="/register">Fazer o cadastro</a>
            </Stack>
          </form>
        </Col>
      </Row>
    </Container>
  );
}

export default Form;
