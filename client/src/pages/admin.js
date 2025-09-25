// client/src/pages/admin.js
import { useEffect, useState, useContext } from "react";
import api from "../api/axios";
import { AuthContext } from "../context/auth_context";
import { useNavigate } from "react-router-dom";

export default function Admin() {
  const { user } = useContext(AuthContext);
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchOrders();
  }, []);

  async function fetchOrders() {
    try {
      const res = await api.get("/orders");
      setOrders(res.data);
    } catch (err) {
      console.error("Nepavyko gauti rezervacijų", err);
    }
  }

  async function updateStatus(id, status) {
    try {
      await api.put(`/orders/${id}/status`, { status });
      fetchOrders();
    } catch (err) {
      console.error("Nepavyko pakeisti būsenos", err);
    }
  }

  if (user?.role !== "admin") {
    return <p>Neturite prieigos prie šio puslapio</p>;
  }

  return (
    <div style={{ color: "white", padding: "20px" }}>
      <h2>Visos rezervacijos</h2>
      <button onClick={() => navigate("/equipment")}>Atgal</button>

      {orders.length === 0 ? (
        <p>Nėra rezervacijų</p>
      ) : (
        <ul style={{ listStyle: "none", padding: 0 }}>
          {orders.map((order) => (
            <li
              key={order._id}
              style={{
                marginBottom: "15px",
                padding: "15px",
                border: "1px solid gray",
                borderRadius: "8px",
                background: "rgba(0,0,0,0.4)"
              }}
            >
              <p>
                <strong>Vartotojas:</strong> {order.user?.username} (
                {order.user?.email})
              </p>
              <p>
                <strong>Automobilis:</strong> {order.equipment?.name}
              </p>
              <p>
                <strong>Laikotarpis:</strong>{" "}
                {new Date(order.fromDate).toLocaleString()} –{" "}
                {new Date(order.toDate).toLocaleString()}
              </p>
              <p>
                <strong>Būsena:</strong>{" "}
                <span style={{ color: "yellow" }}>{order.status}</span>
              </p>

              <select
                value={order.status}
                onChange={(e) => updateStatus(order._id, e.target.value)}
              >
                <option value="laukianti">Laukianti</option>
                <option value="patvirtinta">Patvirtinta</option>
                <option value="atmesta">Atmesta</option>
                <option value="vykdoma">Vykdoma</option>
              </select>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}