import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import { AuthProvider, AuthContext } from "./context/auth_context";
import { useContext } from "react";

import Home from "./pages/home";
import Login from "./pages/login";
import Register from "./pages/register";
import EquipmentList from "./pages/equipment_list";
import Orders from "./pages/orders";
import Admin from "./pages/admin";
import ProtectedRoute from "./components/protected_route";
import MyOrders from "./pages/my_orders";

import "./App.css";

function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <button onClick={() => navigate("/")}>Pradžia</button>
      {user && (
        <>
          <button onClick={() => navigate("/equipment")}>Automobiliai</button>
          <button onClick={() => navigate("/orders")}>Rezervacijos</button>
        </>
      )}

      {!user && (
        <>
          <button onClick={() => navigate("/login")}>Prisijungti</button>
          <button onClick={() => navigate("/register")}>Registruotis</button>
        </>
      )}

      {user && (
        <>
          {user.role === "admin" && (
            <button onClick={() => navigate("/admin")}>Admin</button>
          )}
          <button onClick={handleLogout}>Atsijungti</button>
        </>
      )}
    </nav>
  );
}

function App() {
  return (
    <AuthProvider>
      <Router>
        {/* Navbar rodom tik tada, jei ne Home */}
        {window.location.pathname !== "/" && <Navbar />}

        <Routes>
  <Route path="/" element={<Home />} />
  <Route path="/login" element={<Login />} />
  <Route path="/register" element={<Register />} />
  <Route path="/equipment" element={<EquipmentList />} />
  <Route path="/orders" element={<Orders />} />
  <Route path="/my-orders" element={<MyOrders />} />
  <Route
    path="/admin"
    element={
      <ProtectedRoute role="admin">
        <Admin />
      </ProtectedRoute>
    }
  />
</Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
