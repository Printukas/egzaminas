import { useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";


export default function Register() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      await api.post("/auth/register", { username, email, password });
      alert("Registracija sėkminga!");
      navigate("/login");
    } catch (err) {
      console.error("REG klaida:", err.response?.data || err.message);
      alert(err.response?.data?.error || "Registracija nepavyko");

    }
  }

  return (
    <div
      style={{
        height: "100vh",
        backgroundImage: "url('/back_car.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "center",
        color: "white",
        textShadow: "2px 2px 6px rgba(38, 32, 32, 0.7)"
      }}
    >
      <form
        onSubmit={handleSubmit}
        style={{
          marginTop: "100px",
          background: "rgba(0,0,0,0.5)",
          padding: "30px",
          borderRadius: "10px",
          display: "flex",
          flexDirection: "column",
          gap: "15px",
          minWidth: "300px"
        }}
      >
        <h2>Registracija</h2>
        <input
          type="text"
          placeholder="Vartotojo vardas"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="El. paštas"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Slaptažodis"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Registruotis</button>
        <button onClick={() => navigate(-1)}>Atgal</button>
      </form>
    </div>
  );
}
