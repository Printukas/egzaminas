import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth_context";

function Home() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  document.body.style.backgroundColor = "#1d193dff";

  return (
    <div className="home-container" style={{ backgroundImage: "url('/back_car.jpg')" }}>
      <h1>Išsinuomok automobilį jau šiandien!</h1>
      <p>Prisijungę galėsite lengvai rezervuoti automobilius internetu.</p>

      {!user && (
        <div style={{ marginTop: "20px" }}>
          <button onClick={() => navigate("/login")}>Prisijungti</button>
          <button onClick={() => navigate("/register")}>Registruotis</button>
        </div>
      )}

      {user && (
        <div style={{ marginTop: "20px" }}>
          <button onClick={() => navigate("/equipment")}>Automobiliai</button>
          <button onClick={() => navigate("/orders")}>Mano rezervacijos</button>
        </div>
      )}
    </div>
  );
}

export default Home;
