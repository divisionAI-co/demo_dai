import { render, screen } from "@testing-library/react";
import App from "./App";

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

  it("shows the footer with current year and 'Powered by DAI'", () => {
    render(<App />);
    const currentYear = new Date().getFullYear();
    expect(screen.getByText(`${currentYear} Powered by DAI`)).toBeInTheDocument();
  });
});
