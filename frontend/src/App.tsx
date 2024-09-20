import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import NotFound from "./pages/errors/NotFound";
import Home from "./pages/Home";
import ProtectedRoute from "./components/ProtectedRoute";
import Forbidden from "./pages/errors/ForbiddenPage";
import ManagerProtectedRoute from "./components/ManagerProtectedRoute";
import Vendedores from "./pages/vendedores/Vendedores";
import Pedidos from "./pages/pedidos/Pedidos";
import Vendas from "./pages/vendas/Vendas";
import VendedoresCadastro from "./pages/vendedores/VendedoresCadastro";
import VendasCadastro from "./pages/vendas/VendasCadastro";
import PedidosCadastro from "./pages/pedidos/PedidosCadastro";

function Logout() {
  localStorage.clear();
  return <Navigate to="/login" />;
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route
          path="/pedidos"
          element={
            <ProtectedRoute>
              <Pedidos />
            </ProtectedRoute>
          }
        />
        <Route
          path="/pedidos/cadastro"
          element={
            <ProtectedRoute>
              <PedidosCadastro />
            </ProtectedRoute>
          }
        />
        <Route
          path="/vendas"
          element={
            <ProtectedRoute>
              <Vendas />
            </ProtectedRoute>
          }
        />
        <Route
          path="/vendas/cadastro"
          element={
            <ProtectedRoute>
              <VendasCadastro />
            </ProtectedRoute>
          }
        />
        <Route
          path="/vendedores"
          element={
            <ProtectedRoute>
              <ManagerProtectedRoute>
                <Vendedores />
              </ManagerProtectedRoute>
            </ProtectedRoute>
          }
        />
        <Route
          path="/vendedores/cadastro"
          element={
            <ProtectedRoute>
              <ManagerProtectedRoute>
                <VendedoresCadastro />
              </ManagerProtectedRoute>
            </ProtectedRoute>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/forbidden" element={<Forbidden />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
