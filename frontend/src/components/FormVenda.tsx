import api from "../api";
import { useForm, SubmitHandler } from "react-hook-form";
import "../styles/form.css";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Stack from "react-bootstrap/Stack";
import Col from "react-bootstrap/Col";

enum prazoEnum {
  padrao = "PADRAO",
  turbo = "TURBO",
  superTurbo = "SUPER TURBO",
}

enum pagamentoEnum {
  boleto = "boleto",
  pix = "pix",
  cartao = "cartao",
}

interface FormRequest {
  route: string;
  method: string;
}
type Inputs = {
  sku: string;
  qutd: number;
  frete: number;
  prazo: prazoEnum;
  desconto: number;
  pagamento: pagamentoEnum;
  titulo: string;
  descricao: string;
};

function FormVenda({ route, method }: FormRequest) {
  const { register, handleSubmit, reset } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (data, e) => {
    e?.preventDefault();

    try {
      const res = await api.post(route, {
        sku: data.sku,
        qutd: data.qutd,
        frete: data.frete,
        prazo: data.prazo,
        desconto: data.desconto,
        pagamento: data.pagamento,
        titulo: data.titulo,
        descricao: data.descricao,
      });
      alert("Cadastro realizado com sucesso!");
      reset();
    } catch (error) {
      alert(error);
    }
  };
  const formTitle: string =
    method === "vendas" ? "Cadastro de Venda" : "Cadastro de pedido";

  return (
    <Container>
      <Row className="justify-content-md-center">
        <Col lg="5">
          <form onSubmit={handleSubmit(onSubmit)} className="form-container-lg">
            <Stack gap={3}>
              <h1>{formTitle}</h1>
              <label>titulo</label>
              <input className="form-input" {...register("titulo")} />
              <label>Descrição</label>
              <textarea className="form-input" {...register("descricao")} />
              <label>sku</label>
              <input className="form-input" {...register("sku")} />
              <label>Qutd</label>
              <input type="number" className="form-input" {...register("qutd")} />
              <label>Frete</label>
              <input className="form-input" {...register("frete")} />
              <label>Desconto</label>
              <input className="form-input" {...register("desconto")} />
              <label>Escolha o tipo de prazo:</label>
              <div>
                <select {...register("prazo")}>
                  <option value="PADRAO">PADRÃO</option>
                  <option value="TURBO">TURBO</option>
                  <option value="SUPER TURBO">SUPER TURBO</option>
                </select>
              </div>
              <label>Escolha o tipo de pagamento:</label>
              <div>
                <select {...register("pagamento")}>
                  <option value="boleto">Boleto</option>
                  <option value="pix">PIX</option>
                  <option value="cartao">Cartão</option>
                </select>
              </div>

              <Button variant="primary" className="form-button" type="submit">
                Cadastrar
              </Button>
            </Stack>
          </form>
        </Col>
      </Row>
    </Container>
  );
}

export default FormVenda;
