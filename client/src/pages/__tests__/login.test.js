import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Login from '../login';
jest.mock("axios");

test('rodo prisijungimo laukus ir mygtuką', () => {
  render(<Login />);
  expect(screen.getByPlaceholderText('Vartotojo vardas')).toBeInTheDocument();
  expect(screen.getByPlaceholderText('Slaptažodis')).toBeInTheDocument();
  expect(screen.getByText('Prisijungti')).toBeInTheDocument();
});
