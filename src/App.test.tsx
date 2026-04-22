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

  it("renders the updated Step 01 description", () => {
    render(<App />);
    expect(screen.getByText("Add a ticket to your board")).toBeInTheDocument();
  });

  it("does not render the old Step 01 description", () => {
    render(<App />);
    expect(
      screen.queryByText("Connect a ticket or describe the change you want.")
    ).not.toBeInTheDocument();
  });

  it("renders Step 01 with the Intent title alongside the new description", () => {
    render(<App />);
    const description = screen.getByText("Add a ticket to your board");
    const stepItem = description.closest("li");
    expect(stepItem).not.toBeNull();
    expect(stepItem).toHaveTextContent("01");
    expect(stepItem).toHaveTextContent("Intent");
  });

  it("still renders the other demo flow steps unchanged", () => {
    render(<App />);
    expect(
      screen.getByText("Spec, architecture, and tasks are produced with traceability.")
    ).toBeInTheDocument();
    expect(
      screen.getByText("Implementation and tests run in an isolated workspace.")
    ).toBeInTheDocument();
    expect(
      screen.getByText("Review, merge, and board updates when your process allows.")
    ).toBeInTheDocument();
  });
});
