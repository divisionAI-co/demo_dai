import { fireEvent, render, screen } from "@testing-library/react";
import App from "./App";

const ORCHESTRATOR_PROCESS_PATH = "/orchestrator-process";

function resetPath(path: string) {
  window.history.pushState({}, "", path);
}

describe("App", () => {
  beforeEach(() => {
    resetPath("/");
  });

  describe("home page", () => {
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
      expect(screen.getByText("Repo-native delivery")).toBeInTheDocument();
    });

    it("does not render the orchestrator process showcase", () => {
      render(<App />);
      expect(screen.queryByText(/suggested demo flow/i)).not.toBeInTheDocument();
      expect(
        screen.queryByRole("heading", { level: 3, name: "Intent" })
      ).not.toBeInTheDocument();
      expect(
        screen.queryByRole("heading", { level: 3, name: "Plan" })
      ).not.toBeInTheDocument();
      expect(
        screen.queryByRole("heading", { level: 3, name: "Build" })
      ).not.toBeInTheDocument();
      expect(
        screen.queryByRole("heading", { level: 3, name: "Ship" })
      ).not.toBeInTheDocument();
    });

    it("provides a link to the orchestrator process page", () => {
      render(<App />);
      const howItWorks = screen.getByRole("link", { name: /how it works/i });
      expect(howItWorks).toBeInTheDocument();
      expect(howItWorks).toHaveAttribute("href", ORCHESTRATOR_PROCESS_PATH);

      const ctaLink = screen.getByRole("link", {
        name: /see the orchestrator process/i,
      });
      expect(ctaLink).toHaveAttribute("href", ORCHESTRATOR_PROCESS_PATH);
    });
  });

  describe("orchestrator process page", () => {
    beforeEach(() => {
      resetPath(ORCHESTRATOR_PROCESS_PATH);
    });

    it("renders the orchestrator process headline at the direct URL", () => {
      render(<App />);
      expect(
        screen.getByRole("heading", {
          level: 1,
          name: /how the orchestrator moves from/i,
        })
      ).toBeInTheDocument();
    });

    it("renders the showcase content with all four steps", () => {
      render(<App />);
      expect(
        screen.getByRole("heading", { level: 2, name: /suggested demo flow/i })
      ).toBeInTheDocument();
      expect(
        screen.getByRole("heading", { level: 3, name: "Intent" })
      ).toBeInTheDocument();
      expect(
        screen.getByRole("heading", { level: 3, name: "Plan" })
      ).toBeInTheDocument();
      expect(
        screen.getByRole("heading", { level: 3, name: "Build" })
      ).toBeInTheDocument();
      expect(
        screen.getByRole("heading", { level: 3, name: "Ship" })
      ).toBeInTheDocument();
      expect(screen.getByText("01")).toBeInTheDocument();
      expect(screen.getByText("02")).toBeInTheDocument();
      expect(screen.getByText("03")).toBeInTheDocument();
      expect(screen.getByText("04")).toBeInTheDocument();
    });

    it("does not render home-page-only sections", () => {
      render(<App />);
      expect(
        screen.queryByRole("heading", { level: 1, name: /ship features with agents/i })
      ).not.toBeInTheDocument();
      expect(screen.queryByText("Multi-agent routing")).not.toBeInTheDocument();
    });

    it("shows a back link to home", () => {
      render(<App />);
      const backLink = screen.getByRole("link", { name: /back to home/i });
      expect(backLink).toHaveAttribute("href", "/");
    });
  });

  describe("client-side navigation", () => {
    it("navigates from home to the orchestrator process page on link click", () => {
      render(<App />);
      expect(
        screen.getByRole("heading", { level: 1, name: /ship features with agents/i })
      ).toBeInTheDocument();

      fireEvent.click(screen.getByRole("link", { name: /how it works/i }));

      expect(window.location.pathname).toBe(ORCHESTRATOR_PROCESS_PATH);
      expect(
        screen.getByRole("heading", {
          level: 1,
          name: /how the orchestrator moves from/i,
        })
      ).toBeInTheDocument();
      expect(
        screen.getByRole("heading", { level: 2, name: /suggested demo flow/i })
      ).toBeInTheDocument();
    });

    it("navigates back to home from the orchestrator process page", () => {
      resetPath(ORCHESTRATOR_PROCESS_PATH);
      render(<App />);

      fireEvent.click(screen.getByRole("link", { name: /back to home/i }));

      expect(window.location.pathname).toBe("/");
      expect(
        screen.getByRole("heading", { level: 1, name: /ship features with agents/i })
      ).toBeInTheDocument();
      expect(screen.queryByText(/suggested demo flow/i)).not.toBeInTheDocument();
    });

    it("does not intercept modified clicks (e.g. meta key for new tab)", () => {
      render(<App />);
      const link = screen.getByRole("link", { name: /how it works/i });

      fireEvent.click(link, { metaKey: true });

      expect(window.location.pathname).toBe("/");
      expect(
        screen.getByRole("heading", { level: 1, name: /ship features with agents/i })
      ).toBeInTheDocument();
    });

    it("responds to popstate events by updating the rendered route", () => {
      render(<App />);
      fireEvent.click(screen.getByRole("link", { name: /how it works/i }));
      expect(window.location.pathname).toBe(ORCHESTRATOR_PROCESS_PATH);

      window.history.pushState({}, "", "/");
      window.dispatchEvent(new PopStateEvent("popstate"));

      expect(
        screen.getByRole("heading", { level: 1, name: /ship features with agents/i })
      ).toBeInTheDocument();
      expect(screen.queryByText(/suggested demo flow/i)).not.toBeInTheDocument();
    });
  });

  describe("shared chrome", () => {
    it("renders the header brand and demo badge on every route", () => {
      render(<App />);
      expect(screen.getByText("Division AI")).toBeInTheDocument();
      expect(screen.getByText(/customer demo/i)).toBeInTheDocument();
    });

    it("renders the footer on the orchestrator process page", () => {
      resetPath(ORCHESTRATOR_PROCESS_PATH);
      render(<App />);
      expect(
        screen.getByText(/not connected to production data/i)
      ).toBeInTheDocument();
    });
  });
});
