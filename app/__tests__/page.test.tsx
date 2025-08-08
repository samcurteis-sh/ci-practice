import Page from "../page";
import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

describe("Homepage", () => {
  it("shows hello world", () => {
    render(<Page />);

    const text = screen.getByText("Hello world!");
    expect(text).toBeInTheDocument();
  });

  //   it("says goodbye when you click the button", async () => {
  //     render(<Page />);

  //     const button = screen.getByTestId("toggleHelloButton")
  //     expect(button).toBeInTheDocument()

  //     await userEvent.click(button)

  //     const text = await screen.findByText("Goodbye world!");

  //     expect(text).toBeInTheDocument()
  //   })
});
