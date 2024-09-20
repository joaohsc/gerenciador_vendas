import api from "../../api";
import { useForm, SubmitHandler } from "react-hook-form";
import DeleteIcon from "@mui/icons-material/Delete";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";

interface FormRequest {
  route: string;
}

type Inputs = {
  email: string;
  password: string;
};

function DeleteButton({ route }: FormRequest) {
  const { register, handleSubmit } = useForm<Inputs>();
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<Inputs> = async (data, e) => {
    e?.preventDefault();
    try {
      console.log(route);
      const res = await api.delete(route);
      alert("Deletado com sucesso!");

      window.location.reload();
    
    } catch (error) {
      alert(error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Button variant="danger" type="submit">
        <DeleteIcon />
      </Button>
    </form>
  );
}

export default DeleteButton;
