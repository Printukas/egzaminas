import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import { AuthContext } from "../context/auth_context";
import EquipmentForm from "../components/equipment_form";

export default function EquipmentList() {
  const { user, logout } = useContext(AuthContext);
  const [equipment, setEquipment] = useState([]);
  const [editingItem, setEditingItem] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchEquipment();
  }, []);

  async function fetchEquipment() {
    try {
      const res = await api.get("/equipment");
      setEquipment(res.data || []);
    } catch (err) {
      console.error("Nepavyko gauti įrangos sąrašo", err);
      setEquipment([]);
    }
  }

  function handleLogout() {
    logout();
    navigate("/login");
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundImage: "url('/road_1.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "center",
        color: "white",
        textShadow: "2px 2px 6px rgba(38, 32, 32, 0.7)",
        position: "relative",
        paddingBottom: "50px",
      }}
    >
      <h1>Nuoma</h1>

      {/* Viršutiniai mygtukai */}
      {user && (
        <div
          style={{
            position: "absolute",
            top: "20px",
            right: "20px",
            zIndex: 10,
            display: "flex",
            gap: "10px",
          }}
        >
          {user.role === "admin" && (
            <button onClick={() => navigate("/admin")}>
              Rezervacijos (admin)
            </button>
          )}
          {user.role === "user" && (
            <button onClick={() => navigate("/my-orders")}>
              Mano rezervacijos
            </button>
          )}
          <button onClick={handleLogout}>Atsijungti</button>
        </div>
      )}

      {/* Admin įrangos forma */}
      {user?.role === "admin" && !editingItem && (
        <EquipmentForm onSave={fetchEquipment} />
      )}

      {editingItem && (
        <EquipmentForm
          initialData={editingItem}
          onSave={() => {
            fetchEquipment();
            setEditingItem(null);
          }}
          onCancel={() => setEditingItem(null)}
        />
      )}

      {/* Įrangos sąrašas */}
      <div style={{ marginTop: "30px", width: "80%" }}>
        {equipment.length === 0 ? (
          <p style={{ textAlign: "center" }}>Sąrašas tuščias</p>
        ) : (
          equipment.map((item) => {
            if (user?.role !== "admin" && item.status !== "published") {
              return null;
            }

            return (
              <div
                key={item._id}
                style={{
                  marginBottom: "20px",
                  padding: "20px",
                  borderRadius: "10px",
                  background: "rgba(9, 13, 37, 0.75)",
                  textAlign: "left",
                }}
              >
                <h3 style={{ fontSize: "22px", marginBottom: "8px" }}>
                  {item.name}{" "}
                  <span
                    style={{
                      fontSize: "16px",
                      fontWeight: "normal",
                      color: "#ccc",
                    }}
                  >
                    – {item.description}
                  </span>
                </h3>

                {/* Tik admin mato statusą */}
                {user?.role === "admin" && (
                  <p>
                    {item.status === "published" ? (
                      <span style={{ color: "lightgreen", fontWeight: "bold" }}>
                        Paskelbta
                      </span>
                    ) : (
                      <span style={{ color: "orange", fontWeight: "bold" }}>
                        Juodraštis
                      </span>
                    )}
                  </p>
                )}

                <div style={{ marginTop: "10px" }}>
                  {user?.role === "admin" ? (
                    <>
                      <button onClick={() => setEditingItem(item)}>
                        Redaguoti
                      </button>
                      <button
                        onClick={() =>
                          api.delete(`/equipment/${item._id}`).then(fetchEquipment)
                        }
                      >
                        Ištrinti
                      </button>
                      <button
                        onClick={() =>
                          api
                            .put(`/equipment/${item._id}`, {
                              status:
                                item.status === "published"
                                  ? "draft"
                                  : "published",
                            })
                            .then(fetchEquipment)
                        }
                      >
                        {item.status === "published" ? "Juodraštis" : "Paskelbta"}
                      </button>
                    </>
                  ) : (
                    <button
                      onClick={() =>
                        navigate("/orders", {
                          state: {
                            equipmentId: item._id,
                            equipmentName: item.name,
                          },
                        })
                      }
                    >
                      Rezervuoti
                    </button>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
