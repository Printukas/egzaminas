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
    <div className="equipment-page" style={{ backgroundImage: "url('/road_1.jpg')" }}>
      <h1 className="equipment-header">Nuoma</h1>

      {user && (
        <div className="equipment-actions">
          {user.role === "admin" && (
            <button onClick={() => navigate("/admin")}>Rezervacijos (admin)</button>
          )}
          {user.role === "user" && (
            <button onClick={() => navigate("/my-orders")}>Mano rezervacijos</button>
          )}
          <button onClick={handleLogout}>Atsijungti</button>
        </div>
      )}

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

      <div className="equipment-list">
        {equipment.length === 0 ? (
          <p style={{ textAlign: "center" }}>Sąrašas tuščias</p>
        ) : (
          equipment.map((item) => {
            if (user?.role !== "admin" && item.status !== "published") {
              return null;
            }

            return (
              <div key={item._id} className="equipment-card">
                <h3>
                  {item.name} <span>– {item.description}</span>
                </h3>

                {user?.role === "admin" && (
                  <p>
                    {item.status === "published" ? (
                      <span style={{ color: "lightgreen", fontWeight: "bold" }}>Paskelbta</span>
                    ) : (
                      <span style={{ color: "orange", fontWeight: "bold" }}>Juodraštis</span>
                    )}
                  </p>
                )}

                <div className="flex-wrap">
                  {user?.role === "admin" ? (
                    <>
                      <button onClick={() => setEditingItem(item)}>Redaguoti</button>
                      <button onClick={() => api.delete(`/equipment/${item._id}`).then(fetchEquipment)}>
                        Ištrinti
                      </button>
                      <button
                        onClick={() =>
                          api
                            .put(`/equipment/${item._id}`, {
                              status: item.status === "published" ? "draft" : "published",
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
                          state: { equipmentId: item._id, equipmentName: item.name },
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
