import { render, screen, within } from "@testing-library/react";
import App from "./App";

describe("App integration — demo flow section", () => {
  it("renders all four steps in order with their titles and descriptions", () => {
    render(<App />);

    const flowHeading = screen.getByRole("heading", {
      level: 2,
      name: "Suggested demo flow",
    });
    const flowSection = flowHeading.closest("section");
    expect(flowSection).not.toBeNull();

    const list = within(flowSection as HTMLElement).getByRole("list");
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

  it("places the new step 01 description inside the Intent list item, not elsewhere on the page", () => {
    render(<App />);

    const newCopy = screen.getByText("Add a ticket to your board");
    const listItem = newCopy.closest("li");
    expect(listItem).not.toBeNull();

    expect(within(listItem as HTMLElement).getByText("01")).toBeInTheDocument();
    expect(within(listItem as HTMLElement).getByText("Intent")).toBeInTheDocument();

    const flowHeading = screen.getByRole("heading", {
      level: 2,
      name: "Suggested demo flow",
    });
    const flowSection = flowHeading.closest("section");
    expect(flowSection).not.toBeNull();
    expect(flowSection).toContainElement(newCopy);
  });

  it("does not leak the previous step 01 copy anywhere in the rendered page", () => {
    render(<App />);
    expect(
      screen.queryByText("Connect a ticket or describe the change you want.")
    ).not.toBeInTheDocument();
    expect(screen.queryByText(/connect a ticket/i)).not.toBeInTheDocument();
  });

  it("keeps the surrounding page chrome and unrelated sections intact", () => {
    render(<App />);

    expect(
      screen.getByRole("heading", { level: 1, name: /ship features with agents/i })
    ).toBeInTheDocument();

    const banner = screen.getByRole("banner");
    expect(within(banner).getByText("Division AI")).toBeInTheDocument();
    expect(within(banner).getByText("Customer demo")).toBeInTheDocument();

    expect(
      screen.getByRole("heading", { level: 2, name: "What to highlight in the room" })
    ).toBeInTheDocument();
    expect(screen.getByText("Multi-agent routing")).toBeInTheDocument();
    expect(screen.getByText("Human-in-the-loop")).toBeInTheDocument();
    expect(screen.getByText("Repo-native delivery")).toBeInTheDocument();

    const footer = screen.getByRole("contentinfo");
    expect(footer).toHaveTextContent(
      "Division AI — customer demo · Not connected to production data"
    );
  });
});
