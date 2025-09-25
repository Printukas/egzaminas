import { render, screen, fireEvent } from "@testing-library/react";
import EquipmentForm from "../equipment_form";

test("renders form inputs", () => {
  render(<EquipmentForm />);
  expect(screen.getByLabelText(/Pavadinimas/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/Kaina/i)).toBeInTheDocument();
});

test("submits form with values", () => {
  const onSubmit = jest.fn();
  render(<EquipmentForm onSubmit={onSubmit} />);

  fireEvent.change(screen.getByLabelText(/Pavadinimas/i), {
    target: { value: "Stalas" },
  });
  fireEvent.change(screen.getByLabelText(/Kaina/i), {
    target: { value: "15" },
  });

  fireEvent.click(screen.getByText(/Išsaugoti/i));

  expect(onSubmit).toHaveBeenCalledWith({ name: "Stalas", price: "15" });
});
