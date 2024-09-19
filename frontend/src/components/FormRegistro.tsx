import { useState } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants";

interface FormRequest {
    route: string;
    method: string;
}

function Form({ route, method } : FormRequest) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [role, setRole] = useState("");

  const navigate = useNavigate();

  const name = method === "register" ? "Registro" : "Login";

  const handleSubmit = async (e : React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
        const res = await api.post(route, {email, password})
        if (method === "login") {
            localStorage.setItem(ACCESS_TOKEN, res.data.token);
            localStorage.setItem(REFRESH_TOKEN, res.data.refresh);
            navigate("/")
        } else {
            navigate("/login")
        }
    } catch (error) {
        alert(error)
    } 
  };

  return (
    <form onSubmit={handleSubmit} className="form-container">
        <h1>{name}</h1>
        <input
        className="form-input"
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Nome do usuário"
        />
        <input
        className="form-input"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Senha"
        />
        <input
        className="form-input"
        type="text"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        />
        <label htmlFor="roles" >Selecione o cargo:</label>
        <select name="roles" id="roles" form="roleform" value={role} onChange={(e) => setRole(e.target.value)}>
            <option value="seller">Vendedor</option>
            <option value="manager">Gerente</option>
        </select>
        <button className="form-button" type="submit">
            {name}
        </button>
    </form>

  );
}

export default Form