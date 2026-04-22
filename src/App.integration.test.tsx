import { render, screen, within } from "@testing-library/react";
import App from "./App";

describe("App integration — footer copyright", () => {
  it("renders the updated 'Demo Orchestrator' copyright in the footer landmark", () => {
    render(<App />);
    const footer = screen.getByRole("contentinfo");
    expect(
      within(footer).getByText(
        "Demo Orchestrator — customer demo · Not connected to production data"
      )
    ).toBeInTheDocument();
  });

  it("does not render the old 'Division AI' copy anywhere in the footer", () => {
    render(<App />);
    const footer = screen.getByRole("contentinfo");
    expect(footer.textContent).not.toMatch(/Division AI/);
  });

  it("keeps the header brand 'Division AI' untouched (only footer changed)", () => {
    render(<App />);
    const header = screen.getByRole("banner");
    expect(within(header).getByText("Division AI")).toBeInTheDocument();
  });

  it("preserves the footer markup: a <footer> containing a single <p> with the new copy", () => {
    const { container } = render(<App />);
    const footer = container.querySelector("footer");
    expect(footer).not.toBeNull();
    const paragraphs = footer!.querySelectorAll("p");
    expect(paragraphs).toHaveLength(1);
    expect(paragraphs[0].textContent).toBe(
      "Demo Orchestrator — customer demo · Not connected to production data"
    );
  });

  it("preserves the footer's styling classes around the text change", () => {
    render(<App />);
    const footer = screen.getByRole("contentinfo");
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

  it("renders the rest of the page alongside the new footer (no regressions)", () => {
    render(<App />);
    expect(
      screen.getByRole("heading", { level: 1, name: /ship features with agents/i })
    ).toBeInTheDocument();
    expect(screen.getByText("Multi-agent routing")).toBeInTheDocument();
    expect(screen.getByText("Human-in-the-loop")).toBeInTheDocument();
    expect(screen.getByText("Repo-native delivery")).toBeInTheDocument();
    expect(screen.getByRole("contentinfo")).toHaveTextContent("Demo Orchestrator");
  });
});
