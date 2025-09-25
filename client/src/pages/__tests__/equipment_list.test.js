import { render, screen, fireEvent } from "@testing-library/react";
import { AuthContext } from "../../context/auth_context";
import EquipmentList from "../equipment_list";
import api from "../../api/axios";

jest.mock("axios");

const mockUser = { role: "admin" };

test("renders 'Nuoma' title", () => {
  render(
    <AuthContext.Provider value={{ user: mockUser, logout: jest.fn() }}>
      <EquipmentList />
    </AuthContext.Provider>
  );
  expect(screen.getByText("Nuoma")).toBeInTheDocument();
});

test("calls API to fetch equipment", async () => {
  api.get.mockResolvedValueOnce({ data: [{ id: 1, name: "Dviratis" }] });

  render(
    <AuthContext.Provider value={{ user: mockUser, logout: jest.fn() }}>
      <EquipmentList />
    </AuthContext.Provider>
  );

  const item = await screen.findByText("Dviratis");
  expect(item).toBeInTheDocument();
  expect(api.get).toHaveBeenCalledWith("/equipment");
});

test("shows add button for admin", () => {
  render(
    <AuthContext.Provider value={{ user: mockUser, logout: jest.fn() }}>
      <EquipmentList />
    </AuthContext.Provider>
  );
  expect(screen.getByText("Pridėti")).toBeInTheDocument();
});
