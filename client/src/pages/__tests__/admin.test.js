import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Admin from "../admin";
import api from "../../api/axios";
import { AuthContext } from "../../context/auth_context";

jest.mock("../../api/axios");

test("admin mato rezervacijas", async () => {
  api.get.mockResolvedValueOnce({
    data: [
      {
        _id: "1",
        user: { username: "Jonas", email: "jonas@test.com" },
        equipment: { name: "Audi" },
        fromDate: new Date().toISOString(),
        toDate: new Date().toISOString(),
        status: "pending",
      },
    ],
  });

  render(
    <AuthContext.Provider value={{ user: { role: "admin" } }}>
      <BrowserRouter>
        <Admin />
      </BrowserRouter>
    </AuthContext.Provider>
  );

  expect(await screen.findByText(/Audi/i)).toBeInTheDocument();
});
