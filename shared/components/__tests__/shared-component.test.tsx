import SharedComponent from "../shared-component";
import { render, screen } from "@testing-library/react";

it("tests shared component copy", () => {
  render(<SharedComponent />);

  const text = screen.getByText("This is a shared component");
  expect(text).toBeInTheDocument();
});
