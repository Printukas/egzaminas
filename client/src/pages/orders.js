import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import api from "../api/axios";

export default function Orders() {
  const location = useLocation();
  const navigate = useNavigate();
  const { equipmentId, equipmentName } = location.state || {};

  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  async function createOrder(e) {
    e.preventDefault();
    try {
      await api.post("/orders", { equipmentId, fromDate, toDate });
      alert("Išsaugota!");
      navigate("/my-orders");
    } catch (err) {
      alert(err.response?.data?.message || "Nepavyko sukurti");
    }
  }
  

  return (
    <div
      style={{
        height: "100vh",
        backgroundImage: "url('/road_1.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div style={{ background: "rgba(9, 13, 37, 0.75)", padding: "30px", borderRadius: "12px", color: "white", width: "400px" }}>
        <h2>Rezervacija nuomai</h2>
        {equipmentName && <h3>{equipmentName}</h3>}
        <form onSubmit={createOrder} style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
          <label>
            Pradžia
            <input type="datetime-local" value={fromDate} onChange={(e) => setFromDate(e.target.value)} required />
          </label>
          <label>
            Pabaiga
            <input type="datetime-local" value={toDate} onChange={(e) => setToDate(e.target.value)} required />
          </label>
          <button type="submit" className="btn-green">
            Išsaugoti
          </button>
          <button className="btn-gray" onClick={() => navigate("/equipment")}>Atgal</button>

        </form>
      </div>
    </div>
  );
}
