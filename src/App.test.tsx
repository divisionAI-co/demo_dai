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

  it("shows the updated Intent step copy", () => {
    render(<App />);
    expect(screen.getByText("Add a ticket to your board")).toBeInTheDocument();
  });

  it("no longer shows the previous Intent step copy", () => {
    render(<App />);
    expect(
      screen.queryByText("Connect a ticket or describe the change you want.")
    ).not.toBeInTheDocument();
  });

  it("preserves the four-step demo flow structure", () => {
    render(<App />);
    const flowSection = document.getElementById("flow");
    expect(flowSection).not.toBeNull();
    const items = flowSection!.querySelectorAll("ol > li");
    expect(items).toHaveLength(4);
    expect(screen.getByText("01")).toBeInTheDocument();
    expect(screen.getByText("02")).toBeInTheDocument();
    expect(screen.getByText("03")).toBeInTheDocument();
    expect(screen.getByText("04")).toBeInTheDocument();
    expect(screen.getByText("Intent")).toBeInTheDocument();
    expect(screen.getByText("Plan")).toBeInTheDocument();
    expect(screen.getByText("Build")).toBeInTheDocument();
    expect(screen.getByText("Ship")).toBeInTheDocument();
  });

  it("keeps the other step descriptions unchanged", () => {
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
