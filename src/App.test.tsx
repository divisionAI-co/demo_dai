import { fireEvent, render, screen, within } from "@testing-library/react";
import App from "./App";

describe("App", () => {
  beforeEach(() => {
    window.history.replaceState({}, "", "/");
  });

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

  it("renders header navigation with Home and Process links", () => {
    render(<App />);
    const header = screen.getByRole("banner");
    expect(within(header).getByRole("link", { name: "Home" })).toBeInTheDocument();
    expect(within(header).getByRole("link", { name: "Process" })).toBeInTheDocument();
  });

  it("renders a landing-page CTA linking to the process page", () => {
    render(<App />);
    const cta = screen.getByRole("link", { name: /see our process/i });
    expect(cta).toBeInTheDocument();
    expect(cta).toHaveAttribute("href", "/process");
  });

  it("navigates to the process page when the header Process link is clicked", () => {
    render(<App />);
    const header = screen.getByRole("banner");
    fireEvent.click(within(header).getByRole("link", { name: "Process" }));
    expect(
      screen.getByRole("heading", { level: 1, name: /our process/i })
    ).toBeInTheDocument();
    expect(window.location.pathname).toBe("/process");
  });

  it("navigates to the process page when the landing CTA is clicked", () => {
    render(<App />);
    fireEvent.click(screen.getByRole("link", { name: /see our process/i }));
    expect(
      screen.getByRole("heading", { level: 1, name: /our process/i })
    ).toBeInTheDocument();
    expect(window.location.pathname).toBe("/process");
  });

  it("navigates back to home when the Home link is clicked from the process page", () => {
    render(<App />);
    const header = screen.getByRole("banner");
    fireEvent.click(within(header).getByRole("link", { name: "Process" }));
    fireEvent.click(within(header).getByRole("link", { name: "Home" }));
    expect(
      screen.getByRole("heading", { level: 1, name: /ship features with agents/i })
    ).toBeInTheDocument();
    expect(window.location.pathname).toBe("/");
  });

  it("renders the process page on initial load when the path is /process", () => {
    window.history.replaceState({}, "", "/process");
    render(<App />);
    expect(
      screen.getByRole("heading", { level: 1, name: /our process/i })
    ).toBeInTheDocument();
    expect(
      screen.queryByRole("heading", { level: 1, name: /ship features with agents/i })
    ).not.toBeInTheDocument();
  });

  it("updates the route in response to a popstate event", () => {
    render(<App />);
    expect(
      screen.getByRole("heading", { level: 1, name: /ship features with agents/i })
    ).toBeInTheDocument();

    window.history.pushState({}, "", "/process");
    window.dispatchEvent(new PopStateEvent("popstate"));

    expect(
      screen.getByRole("heading", { level: 1, name: /our process/i })
    ).toBeInTheDocument();
  });

  it("marks the active nav link when on the process page", () => {
    render(<App />);
    const header = screen.getByRole("banner");
    const processLink = within(header).getByRole("link", { name: "Process" });
    fireEvent.click(processLink);
    expect(processLink.className).toMatch(/text-accent/);
  });

  it("renders a footer with demo attribution", () => {
    render(<App />);
    const footer = screen.getByRole("contentinfo");
    expect(footer).toHaveTextContent(/division ai/i);
    expect(footer).toHaveTextContent(/customer demo/i);
  });

  it("marks the Home nav link as active on initial render", () => {
    render(<App />);
    const header = screen.getByRole("banner");
    const homeLink = within(header).getByRole("link", { name: "Home" });
    const processLink = within(header).getByRole("link", { name: "Process" });
    expect(homeLink.className).toMatch(/text-accent/);
    expect(processLink.className).not.toMatch(/text-accent/);
  });

  it("navigates home when the brand link in the header is clicked from the process page", () => {
    window.history.replaceState({}, "", "/process");
    render(<App />);
    const header = screen.getByRole("banner");
    const brandLink = within(header).getByRole("link", { name: /division ai/i });
    expect(brandLink).toHaveAttribute("href", "/");
    fireEvent.click(brandLink);
    expect(
      screen.getByRole("heading", { level: 1, name: /ship features with agents/i })
    ).toBeInTheDocument();
    expect(window.location.pathname).toBe("/");
  });

  it("navigates home when the process page back-to-home button is clicked", () => {
    render(<App />);
    const header = screen.getByRole("banner");
    fireEvent.click(within(header).getByRole("link", { name: "Process" }));
    fireEvent.click(screen.getByRole("button", { name: /back to home/i }));
    expect(
      screen.getByRole("heading", { level: 1, name: /ship features with agents/i })
    ).toBeInTheDocument();
    expect(window.location.pathname).toBe("/");
  });

  it("renders the suggested demo flow steps on the home page", () => {
    render(<App />);
    expect(screen.getByText("01")).toBeInTheDocument();
    expect(screen.getByText("02")).toBeInTheDocument();
    expect(screen.getByText("03")).toBeInTheDocument();
    expect(screen.getByText("04")).toBeInTheDocument();
    expect(screen.getByText("Intent")).toBeInTheDocument();
    expect(screen.getByText("Plan")).toBeInTheDocument();
    expect(screen.getByText("Build")).toBeInTheDocument();
    expect(screen.getByText("Ship")).toBeInTheDocument();
  });

  it("falls back to the home view when the path is unknown", () => {
    window.history.replaceState({}, "", "/some-unknown-route");
    render(<App />);
    expect(
      screen.getByRole("heading", { level: 1, name: /ship features with agents/i })
    ).toBeInTheDocument();
    expect(
      screen.queryByRole("heading", { level: 1, name: /our process/i })
    ).not.toBeInTheDocument();
  });

  it("does not push a new history entry when navigating to the current route", () => {
    render(<App />);
    const header = screen.getByRole("banner");
    fireEvent.click(within(header).getByRole("link", { name: "Process" }));
    const lengthAfterFirstNav = window.history.length;
    fireEvent.click(within(header).getByRole("link", { name: "Process" }));
    expect(window.history.length).toBe(lengthAfterFirstNav);
    expect(window.location.pathname).toBe("/process");
  });

  it("renders the See capabilities anchor link pointing at the features section", () => {
    render(<App />);
    const link = screen.getByRole("link", { name: /see capabilities/i });
    expect(link).toHaveAttribute("href", "#features");
  });
});
