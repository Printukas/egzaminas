import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { AuthContext } from "../../context/auth_context";
import Home from "../home";
jest.mock("axios");

test("renders homepage title", () => {
  render(
    <AuthContext.Provider value={{ user: null }}>
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    </AuthContext.Provider>
  );
  expect(screen.getByText(/Sveiki atvykę/i)).toBeInTheDocument();
});

test("renders login link if not logged in", () => {
  render(
    <AuthContext.Provider value={{ user: null }}>
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    </AuthContext.Provider>
  );
  expect(screen.getByText(/Prisijungti/i)).toBeInTheDocument();
});
