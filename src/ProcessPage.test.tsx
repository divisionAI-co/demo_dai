import { render, screen } from "@testing-library/react";
import ProcessPage, { STEPS } from "./ProcessPage";

describe("ProcessPage", () => {
  it("renders the main heading", () => {
    render(<ProcessPage />);
    expect(
      screen.getByRole("heading", { level: 1, name: /our process/i })
    ).toBeInTheDocument();
  });

  it("renders every process step title", () => {
    render(<ProcessPage />);
    for (const step of STEPS) {
      expect(screen.getByText(step.title)).toBeInTheDocument();
    }
  });
});
