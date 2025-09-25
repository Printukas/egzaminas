import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Register from "../register";
import api from "../../api/axios";

jest.mock("../../api/axios");

test("sėkminga registracija", async () => {
  api.post.mockResolvedValueOnce({ data: { message: "OK" } });

  render(
    <BrowserRouter>
      <Register />
    </BrowserRouter>
  );

  fireEvent.change(screen.getByPlaceholderText(/Vartotojo vardas/i), {
    target: { value: "Jonas" },
  });
  fireEvent.change(screen.getByPlaceholderText(/El. paštas/i), {
    target: { value: "jonas@test.com" },
  });
  fireEvent.change(screen.getByPlaceholderText(/Slaptažodis/i), {
    target: { value: "slaptas" },
  });

  fireEvent.click(screen.getByText(/Registruotis/i));

  expect(api.post).toHaveBeenCalledWith("/auth/register", {
    username: "Jonas",
    email: "jonas@test.com",
    password: "slaptas",
  });
});
