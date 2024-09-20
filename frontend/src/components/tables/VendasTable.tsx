import Table from "react-bootstrap/Table";
import api from "../../api";
import { useEffect, useState } from "react";
import { Alert } from "react-bootstrap";
import DeleteButton from "../buttons/DeleteButton";

interface Props {
  route: string;
}

interface VendaProps {
  id: string;
  sku: string;
  qutd: number;
  somaProduto: number; // dinamico
  frete: number;
  prazo: string;
  desconto: number;
  titulo: string;
  descricao: string;
  descontoMaximo: number; // dinamico
  userId: string; // dinamico
  pagamento: string;
  valorTotalVenda: number;
}

function VendasTable({ route }: Props) {
  const [data, setData] = useState<VendaProps[]>([]);
  useEffect(() => {
    api
      .get(route)
      .then((res) => {
        if (res.data) {
          setData(res.data);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>id</th>
          <th>Sku</th>
          <th>Qutd</th>
          <th>Soma (R$)</th>
          <th>Total(R$)</th>
          <th>Frete</th>
          <th>Prazo</th>
          <th>Desconto (%)</th>
          <th>Desconto Max. (%)</th>
          <th>Pagamento</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {data.length > 0 ? (
          data.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.sku}</td>
              <td>{item.qutd}</td>
              <td>{item.somaProduto}</td>
              <td>{item.valorTotalVenda}</td>
              <td>{item.frete}</td>
              <td>{item.prazo}</td>
              <td>{item.desconto}</td>
              <td>{item.descontoMaximo}</td>
              <td>{item.pagamento}</td>
              <td>
                <DeleteButton route={"/vendas/" + item.id} />
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan={3}>
              <Alert variant="warning">Nenhum item encontrado!</Alert>
            </td>
          </tr>
        )}
      </tbody>
    </Table>
  );
}

export default VendasTable;
