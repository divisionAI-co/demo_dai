import { render, screen, within } from "@testing-library/react";
import App from "./App";

describe("App", () => {
  it("renders the hero headline", () => {
    render(<App />);
    expect(
      screen.getByRole("heading", { level: 1, name: /ship features with agents/i })
    ).toBeInTheDocument();
  });

  it("renders the header brand and demo badge", () => {
    render(<App />);
    expect(screen.getByText("Division AI")).toBeInTheDocument();
    expect(screen.getByText("Customer demo")).toBeInTheDocument();
  });

  it("renders the hero intro copy and eyebrow tag", () => {
    render(<App />);
    expect(
      screen.getByText(/live orchestration for software delivery/i)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/lightweight demo shell/i)
    ).toBeInTheDocument();
  });

  it("exposes anchor-based navigation to the features and flow sections", () => {
    render(<App />);

    const capabilitiesLink = screen.getByRole("link", { name: /see capabilities/i });
    expect(capabilitiesLink).toHaveAttribute("href", "#features");

    const howItWorksLink = screen.getByRole("link", { name: /how it works/i });
    expect(howItWorksLink).toHaveAttribute("href", "#flow");
  });

  it("shows capability cards", () => {
    render(<App />);
    expect(screen.getByText("Multi-agent routing")).toBeInTheDocument();
    expect(screen.getByText("Human-in-the-loop")).toBeInTheDocument();
    expect(screen.getByText("Repo-native delivery")).toBeInTheDocument();
  });

  it("renders all three capability card bodies", () => {
    render(<App />);
    expect(
      screen.getByText(/planner, coder, tester, and reviewer collaborate/i)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/approve gates before sensitive steps/i)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/clone, edit, test, and push against your real stack/i)
    ).toBeInTheDocument();
  });

  it("renders the suggested demo flow section with heading and description", () => {
    render(<App />);
    expect(
      screen.getByRole("heading", { level: 2, name: /suggested demo flow/i })
    ).toBeInTheDocument();
    expect(
      screen.getByText(/four-beat narrative you can complete in under ten minutes/i)
    ).toBeInTheDocument();
  });

  it("renders the orchestrator process steps in sequential order", () => {
    render(<App />);

    const list = screen.getByRole("list");
    const items = within(list).getAllByRole("listitem");
    expect(items).toHaveLength(4);

    const expectedSteps = [
      { n: "01", title: "Intent" },
      { n: "02", title: "Plan" },
      { n: "03", title: "Build" },
      { n: "04", title: "Ship" },
    ];

    expectedSteps.forEach((step, index) => {
      const item = items[index];
      expect(within(item).getByText(step.n)).toBeInTheDocument();
      expect(within(item).getByText(step.title)).toBeInTheDocument();
    });
  });

  it("renders the descriptions for each orchestrator step", () => {
    render(<App />);
    expect(
      screen.getByText(/connect a ticket or describe the change you want/i)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/spec, architecture, and tasks are produced with traceability/i)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/implementation and tests run in an isolated workspace/i)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/review, merge, and board updates when your process allows/i)
    ).toBeInTheDocument();
  });

  it('has a "What to highlight in the room" section for features', () => {
    render(<App />);
    expect(
      screen.getByRole("heading", { level: 2, name: /what to highlight in the room/i })
    ).toBeInTheDocument();
  });

  it("renders the closing CTA block and footer", () => {
    render(<App />);
    expect(
      screen.getByRole("heading", { level: 2, name: /ready for the next slide/i })
    ).toBeInTheDocument();
    expect(
      screen.getByText(/division ai — customer demo · not connected to production data/i)
    ).toBeInTheDocument();
  });

  it("renders the Vite logo in the header with an empty alt (decorative)", () => {
    const { container } = render(<App />);
    const logo = container.querySelector('img[src="/vite.svg"]');
    expect(logo).not.toBeNull();
    expect(logo).toHaveAttribute("alt", "");
  });
});
