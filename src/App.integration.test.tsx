import { render, screen, within } from "@testing-library/react";
import App from "./App";

describe("App (integration) — demo flow steps", () => {
  it("renders the Intent step with the updated description inside the flow section", () => {
    render(<App />);

    const flowHeading = screen.getByRole("heading", {
      level: 2,
      name: /suggested demo flow/i,
    });
    const flowSection = flowHeading.closest("section");
    expect(flowSection).not.toBeNull();

    const list = flowSection!.querySelector("ol");
    expect(list).not.toBeNull();

    const intentItem = within(list as HTMLElement).getByText("Intent").closest("li");
    expect(intentItem).not.toBeNull();
    expect(intentItem).toHaveTextContent("01");
    expect(intentItem).toHaveTextContent("Intent");
    expect(intentItem).toHaveTextContent("Add a ticket to your board");
  });

  it("removes the prior Intent description from the rendered page", () => {
    render(<App />);
    expect(
      screen.queryByText(/Connect a ticket or describe the change you want\./i)
    ).not.toBeInTheDocument();
  });

  it("preserves the order and content of the other demo flow steps", () => {
    render(<App />);

    const flowHeading = screen.getByRole("heading", {
      level: 2,
      name: /suggested demo flow/i,
    });
    const list = flowHeading.closest("section")!.querySelector("ol") as HTMLElement;
    const items = within(list).getAllByRole("listitem");

    expect(items).toHaveLength(4);

    expect(items[0]).toHaveTextContent("01");
    expect(items[0]).toHaveTextContent("Intent");
    expect(items[0]).toHaveTextContent("Add a ticket to your board");

    expect(items[1]).toHaveTextContent("02");
    expect(items[1]).toHaveTextContent("Plan");
    expect(items[1]).toHaveTextContent(
      "Spec, architecture, and tasks are produced with traceability."
    );

    expect(items[2]).toHaveTextContent("03");
    expect(items[2]).toHaveTextContent("Build");
    expect(items[2]).toHaveTextContent(
      "Implementation and tests run in an isolated workspace."
    );

    expect(items[3]).toHaveTextContent("04");
    expect(items[3]).toHaveTextContent("Ship");
    expect(items[3]).toHaveTextContent(
      "Review, merge, and board updates when your process allows."
    );
  });

  it("keeps unrelated sections (hero, features, footer) intact", () => {
    render(<App />);

    expect(
      screen.getByRole("heading", { level: 1, name: /ship features with agents/i })
    ).toBeInTheDocument();

    expect(
      screen.getByRole("heading", { level: 2, name: /what to highlight in the room/i })
    ).toBeInTheDocument();
    expect(screen.getByText("Multi-agent routing")).toBeInTheDocument();
    expect(screen.getByText("Human-in-the-loop")).toBeInTheDocument();
    expect(screen.getByText("Repo-native delivery")).toBeInTheDocument();

    expect(
      screen.getByText(/Division AI — customer demo · Not connected to production data/i)
    ).toBeInTheDocument();
  });
});
