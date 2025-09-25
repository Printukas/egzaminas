import { useState } from "react";
import api from "../api/axios";  

export default function EquipmentForm({ initialData = null, onSave, onCancel }) {
  const [name, setName] = useState(initialData?.name || "");
  const [description, setDescription] = useState(initialData?.description || "");

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      if (initialData) {
        // Redagavimas
        await api.put(`/equipment/${initialData._id}`, { name, description });
      } else {
        // Naujas įrašas
        await api.post("/equipment", { name, description });
      }

      if (onSave) onSave();
    } catch (err) {
      console.error("Nepavyko išsaugoti įrangos:", err);
      alert("Klaida išsaugant įrangą");
    }
  }

  return (
    <div className="equipment-form-wrapper">
      <form onSubmit={handleSubmit} className="equipment-form">
        <input
          type="text"
          placeholder="Pavadinimas"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Aprašymas"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <div className="equipment-form-buttons">
          <button type="submit">
            {initialData ? "Išsaugoti pakeitimus" : "Pridėti"}
          </button>
          {onCancel && (
            <button type="button" onClick={onCancel} className="btn-gray">
              Atšaukti
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
