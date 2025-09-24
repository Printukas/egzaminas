import { useEffect, useState, useContext } from "react";
import api from "../api/axios";
import { AuthContext } from "../context/auth_context";
import { useNavigate } from "react-router-dom";

export default function AdminOrders() {
    const { user } = useContext(AuthContext);
    const [orders, setOrders] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetchOrders();
    }, []);

    async function fetchOrders() {
        try {
            const res = await api.get("/orders/all");
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

    async function cancelOrder(id) {
        try {
            await api.delete(`/orders/${id}`);
            fetchOrders();
        } catch (err) {
            console.error("Nepavyko atšaukti rezervacijos", err);
        }
    }

    if (user?.role !== "admin") {
        return <p>Neturite prieigos prie šio puslapio</p>;
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
            <h2>Visos rezervacijos</h2>
            
            {orders.length === 0 ? (
                <p>Nėra rezervacijų</p>
            ) : (
                <ul style={{ listStyle: "none", padding: 0 }}>
                    {orders.map((order) => (
                        <li
                            key={order._id}
                            style={{
                                marginBottom: "20px",
                                padding: "15px",
                                borderRadius: "8px",
                                background: "rgba(9, 13, 37, 0.75)",
                            }}
                        >
                            <p>
                                <strong>Vartotojas:</strong> {order.user?.username} (
                                {order.user?.email})
                            </p>
                            <p>
                                <strong>Įranga:</strong> {order.equipment?.name}
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

                            <div style={{ marginTop: "10px", display: "flex", gap: "10px" }}>
                                <button onClick={() => updateStatus(order._id, "patvirtinta")}>
                                    Patvirtinti
                                </button>
                                <button onClick={() => updateStatus(order._id, "atmesta")}>
                                    Atmesti
                                </button>
                                <button onClick={() => updateStatus(order._id, "vykdoma")}>
                                    Vykdyti
                                </button>
                                <button onClick={() => updateStatus(order._id, "laukianti")}>
                                    Laukianti
                                </button>
                                <button onClick={() => navigate("/equipment")}>Atgal</button>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
