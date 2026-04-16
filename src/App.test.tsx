import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { App } from "./App";

describe("App", () => {
  it("renders the hero headline", () => {
    render(<App />);
    expect(
      screen.getByRole("heading", { level: 1, name: /ship features with agents/i })
    ).toBeInTheDocument();
  });

  it("shows capability cards", () => {
    render(<App />);
    expect(screen.getByText("Multi-agent routing")).toBeInTheDocument();
    expect(screen.getByText("Human-in-the-loop")).toBeInTheDocument();
  });
});
