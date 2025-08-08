import Page from "../page";
import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";

describe("Homepage", () => {
  it("shows hello world", () => {
    render(<Page />);

    const text = screen.getByText("Hello world!");
    expect(text).toBeInTheDocument();
  });
});
