import { useState, useContext } from "react";//
import api from "../api/axios";
import { AuthContext } from "../context/auth_context";
import { useNavigate } from "react-router-dom";

export default function Login() {
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    async function handleSubmit(e) {
        e.preventDefault();
        try {
            const res = await api.post("/auth/login", { email, password });
            login(res.data.token, res.data.user);
            navigate("/equipment");
        } catch (err) {
            alert("Nepavyko prisijungti");
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
                <h2>Prisijungimas</h2>
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
                <button type="submit">Prisijungti</button>
                <button onClick={() => navigate(-1)}>Atgal</button>
            </form>
        </div>
    );
}
