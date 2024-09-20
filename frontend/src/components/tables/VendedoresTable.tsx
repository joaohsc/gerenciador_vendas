import Table from "react-bootstrap/Table";
import api from "../../api";
import { useEffect, useState } from "react";
import { Alert, Button } from "react-bootstrap";
import DeleteButton from "../buttons/DeleteButton";
import { useNavigate } from "react-router-dom";

interface Props {
  route: string;
}

interface UserProps {
  id: string;
  username: string;
  email: string;
}

function VendedoresTable({ route }: Props) {
  const [data, setData] = useState<UserProps[]>([]);
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
          <th>Nome</th>
          <th>Email</th>
        </tr>
      </thead>
      <tbody>
        {data.length > 0 ? (
          data.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.username}</td>
              <td>{item.email}</td>
              <td>
                <DeleteButton route={"/vendedores/" + item.id} />
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

export default VendedoresTable;
