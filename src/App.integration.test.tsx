import { render, screen, within } from "@testing-library/react";
import App from "./App";

describe("App integration — demo flow copy", () => {
  it("renders the updated Intent step copy inside the flow section", () => {
    render(<App />);

    const flowSection = document.getElementById("flow");
    expect(flowSection).not.toBeNull();

    expect(
      within(flowSection as HTMLElement).getByText("Add a ticket to your board")
    ).toBeInTheDocument();
  });

  it("does not render the old Intent copy anywhere in the page", () => {
    render(<App />);
    expect(
      screen.queryByText("Connect a ticket or describe the change you want.")
    ).not.toBeInTheDocument();
  });

  it("associates the new Intent copy with the '01' / 'Intent' step", () => {
    render(<App />);

    const intentHeading = screen.getByRole("heading", { level: 3, name: "Intent" });
    const stepItem = intentHeading.closest("li");
    expect(stepItem).not.toBeNull();

    const scoped = within(stepItem as HTMLElement);
    expect(scoped.getByText("01")).toBeInTheDocument();
    expect(scoped.getByText("Add a ticket to your board")).toBeInTheDocument();
  });

  it("preserves the four-step narrative with correct order and descriptions", () => {
    render(<App />);

    const flowSection = document.getElementById("flow") as HTMLElement;
    const items = flowSection.querySelectorAll("ol > li");
    expect(items).toHaveLength(4);

    const expected = [
      { n: "01", t: "Intent", d: "Add a ticket to your board" },
      {
        n: "02",
        t: "Plan",
        d: "Spec, architecture, and tasks are produced with traceability.",
      },
      {
        n: "03",
        t: "Build",
        d: "Implementation and tests run in an isolated workspace.",
      },
      {
        n: "04",
        t: "Ship",
        d: "Review, merge, and board updates when your process allows.",
      },
    ];

    expected.forEach((step, index) => {
      const li = items[index] as HTMLElement;
      const scoped = within(li);
      expect(scoped.getByText(step.n)).toBeInTheDocument();
      expect(
        scoped.getByRole("heading", { level: 3, name: step.t })
      ).toBeInTheDocument();
      expect(scoped.getByText(step.d)).toBeInTheDocument();
    });
  });

  it("renders the surrounding page structure alongside the updated step", () => {
    render(<App />);

    expect(
      screen.getByRole("heading", { level: 1, name: /ship features with agents/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { level: 2, name: /suggested demo flow/i })
    ).toBeInTheDocument();
    expect(screen.getByText("Add a ticket to your board")).toBeInTheDocument();
  });
});
