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

  it("renders the updated footer copyright text", () => {
    render(<App />);
    const footer = screen.getByRole("contentinfo");
    expect(footer).toHaveTextContent(
      "Demo Orchestrator — customer demo · Not connected to production data"
    );
  });

  it("no longer references 'Division AI' in the footer", () => {
    render(<App />);
    const footer = screen.getByRole("contentinfo");
    expect(footer).not.toHaveTextContent(/Division AI/);
  });

  it("preserves the footer element and its styling classes", () => {
    render(<App />);
    const footer = screen.getByRole("contentinfo");
    expect(footer.tagName).toBe("FOOTER");
    expect(footer).toHaveClass(
      "relative",
      "border-t",
      "border-surface-border",
      "py-8",
      "text-center",
      "text-sm",
      "text-slate-500"
    );
  });

  it("renders the footer text inside a <p> element", () => {
    render(<App />);
    const footer = screen.getByRole("contentinfo");
    const paragraph = footer.querySelector("p");
    expect(paragraph).not.toBeNull();
    expect(paragraph?.textContent).toBe(
      "Demo Orchestrator — customer demo · Not connected to production data"
    );
  });
});
