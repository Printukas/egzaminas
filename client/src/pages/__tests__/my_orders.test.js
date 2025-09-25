import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import MyOrders from "../myorders";
import api from "../../api/axios";

jest.mock("../../api/axios");

test("parodo rezervacijų sąrašą", async () => {
  api.get.mockResolvedValueOnce({
    data: [
      {
        _id: "1",
        equipment: { name: "BMW" },
        fromDate: new Date().toISOString(),
        toDate: new Date().toISOString(),
        status: "pending",
      },
    ],
  });

  render(
    <BrowserRouter>
      <MyOrders />
    </BrowserRouter>
  );

  expect(await screen.findByText(/BMW/i)).toBeInTheDocument();
});
