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

  it("shows the updated description for the Intent step", () => {
    render(<App />);
    expect(screen.getByText("Add a ticket to your board")).toBeInTheDocument();
  });

  it("no longer shows the previous Intent step description", () => {
    render(<App />);
    expect(
      screen.queryByText("Connect a ticket or describe the change you want.")
    ).not.toBeInTheDocument();
  });

  it("associates the new description with the 01 Intent step", () => {
    render(<App />);
    const intentStep = screen.getByText("Intent").closest("li");
    expect(intentStep).not.toBeNull();
    expect(intentStep).toHaveTextContent("01");
    expect(intentStep).toHaveTextContent("Add a ticket to your board");
  });

  it("retains the other demo flow steps", () => {
    render(<App />);
    expect(screen.getByText("Plan")).toBeInTheDocument();
    expect(screen.getByText("Build")).toBeInTheDocument();
    expect(screen.getByText("Ship")).toBeInTheDocument();
  });
});
