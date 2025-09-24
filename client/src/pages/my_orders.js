import { useEffect, useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";

export default function MyOrders() {
  const [orders, setOrders] = useState([]);
  const [editingOrder, setEditingOrder] = useState(null); // laikys redaguojamą rezervaciją
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchOrders();
  }, []);

  async function fetchOrders() {
    try {
      const res = await api.get("/orders");
      setOrders(res.data.filter((o) => o.status !== "cancelled"));
    } catch (err) {
      console.error("Nepavyko gauti rezervacijų", err);
    }
  }

  async function cancelOrder(id) {
    try {
      await api.delete(`/orders/${id}`);
      alert("Rezervacija atšaukta!");
      fetchOrders();
      navigate("/equipment");
    } catch (err) {
      console.error("Nepavyko atšaukti rezervacijos", err);
    }
  }

  async function saveEdit(e) {
    e.preventDefault();
    try {
      await api.put(`/orders/${editingOrder._id}`, {
        fromDate,
        toDate,
      });
      alert("Rezervacija atnaujinta!");
      setEditingOrder(null);
      fetchOrders();
    } catch (err) {
      alert("Nepavyko atnaujinti rezervacijos");
    }
  }

  function translateStatus(status) {
    switch (status) {
      case "pending":
        return "laukianti";
      case "confirmed":
        return "patvirtinta";
      case "rejected":
        return "atmesta";
      case "cancelled":
        return "atšaukta";
      case "vykdoma":
        return "vykdoma";
      default:
        return status;
    }
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundImage: "url('/road_1.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        padding: "30px",
        color: "white",
      }}
    >
        <button onClick={() => navigate("/equipment")}>Atgal</button>
      <h2>Rezervacijos</h2>
      

      {/* Redagavimo forma */}
      {editingOrder && (
        <form
          onSubmit={saveEdit}
          style={{
            marginBottom: "20px",
            padding: "20px",
            background: "rgba(9, 13, 37, 0.85)",
            borderRadius: "8px",
          }}
        >
          <h3>Redaguoti rezervaciją ({editingOrder.equipment?.name})</h3>
          <label>
            Nauja pradžios data:
            <input
              type="datetime-local"
              value={fromDate}
              onChange={(e) => setFromDate(e.target.value)}
              required
            />
          </label>
          <br />
          <label>
            Nauja pabaigos data:
            <input
              type="datetime-local"
              value={toDate}
              onChange={(e) => setToDate(e.target.value)}
              required
            />
          </label>
          <br />
          <button type="submit" style={{ marginRight: "10px" }}>
            Išsaugoti
          </button>
          <button type="button" onClick={() => setEditingOrder(null)}>
            Atšaukti
          </button>
        </form>
      )}

      {/* Rezervacijų sąrašas */}
      {orders.length === 0 ? (
        <p>Sąrašas tuščias</p>
      ) : (
        <ul style={{ listStyle: "none", padding: 0 }}>
          {orders.map((o) => (
            <li
              key={o._id}
              style={{
                marginBottom: "15px",
                padding: "15px",
                background: "rgba(9, 13, 37, 0.75)",
                borderRadius: "8px",
              }}
            >
              <p>
                <strong>{o.equipment?.name}</strong>
              </p>
              <p>
                {new Date(o.fromDate).toLocaleString()} –{" "}
                {new Date(o.toDate).toLocaleString()}
              </p>
              <p>Būsena: {translateStatus(o.status)}</p>

              <button
                style={{
                  background: "transparent",
                  color: "white",
                  padding: "8px 14px",
                  borderColor: "blue",
                  borderRadius: "10",
                  marginRight: "10px",
                }}
                onClick={() => {
                  setEditingOrder(o);
                  setFromDate(new Date(o.fromDate).toISOString().slice(0, 16));
                  setToDate(new Date(o.toDate).toISOString().slice(0, 16));
                }}
              >
                Redaguoti
              </button>

              <button
                style={{
                  background: "transparent",
                  color: "white",
                  padding: "8px 14px",
                  borderColor: "purple",
                  borderRadius: "10",
                  marginRight: "10px",
                }}
                onClick={() => cancelOrder(o._id)}
              >
                Atšaukti
              </button>

              
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
