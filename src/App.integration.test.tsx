import { render, screen, within } from "@testing-library/react";
import App from "./App";

describe("App integration — Step 01 description update", () => {
  it("renders the new Step 01 description inside the Suggested demo flow section", () => {
    render(<App />);

    const flowHeading = screen.getByRole("heading", {
      level: 2,
      name: /suggested demo flow/i,
    });
    const flowSection = flowHeading.closest("section");
    expect(flowSection).not.toBeNull();

    const scoped = within(flowSection as HTMLElement);
    expect(scoped.getByText("Add a ticket to your board")).toBeInTheDocument();
  });

  it("removes the previous Step 01 copy from the rendered page", () => {
    render(<App />);
    expect(
      screen.queryByText("Connect a ticket or describe the change you want.")
    ).not.toBeInTheDocument();
  });

  it("keeps Step 01 label ('01' + 'Intent') paired with the new description", () => {
    render(<App />);
    const description = screen.getByText("Add a ticket to your board");
    const stepItem = description.closest("li");
    expect(stepItem).not.toBeNull();

    const scoped = within(stepItem as HTMLElement);
    expect(scoped.getByText("01")).toBeInTheDocument();
    expect(scoped.getByText("Intent")).toBeInTheDocument();
  });

  it("preserves all four demo flow steps in order with the updated Step 01 copy", () => {
    render(<App />);
    const flowHeading = screen.getByRole("heading", {
      level: 2,
      name: /suggested demo flow/i,
    });
    const orderedList = flowHeading.parentElement?.querySelector("ol");
    expect(orderedList).not.toBeNull();

    const items = (orderedList as HTMLElement).querySelectorAll("li");
    expect(items).toHaveLength(4);

    expect(items[0]).toHaveTextContent("01");
    expect(items[0]).toHaveTextContent("Intent");
    expect(items[0]).toHaveTextContent("Add a ticket to your board");

    expect(items[1]).toHaveTextContent("Plan");
    expect(items[1]).toHaveTextContent(
      "Spec, architecture, and tasks are produced with traceability."
    );

    expect(items[2]).toHaveTextContent("Build");
    expect(items[2]).toHaveTextContent(
      "Implementation and tests run in an isolated workspace."
    );

    expect(items[3]).toHaveTextContent("Ship");
    expect(items[3]).toHaveTextContent(
      "Review, merge, and board updates when your process allows."
    );
  });

  it("does not affect unrelated surfaces (hero, features, footer)", () => {
    render(<App />);
    expect(
      screen.getByRole("heading", { level: 1, name: /ship features with agents/i })
    ).toBeInTheDocument();
    expect(screen.getByText("Multi-agent routing")).toBeInTheDocument();
    expect(screen.getByText("Human-in-the-loop")).toBeInTheDocument();
    expect(screen.getByText("Repo-native delivery")).toBeInTheDocument();
    expect(
      screen.getByText(/Division AI — customer demo/i)
    ).toBeInTheDocument();
  });
});
