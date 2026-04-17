import { render, screen } from "@testing-library/react";
import App from "./App";

describe("App integration", () => {
  it("renders the footer with current year and 'Powered by DAI'", () => {
    render(<App />);
    const currentYear = new Date().getFullYear();
    expect(screen.getByText(`\${currentYear} Powered by DAI`)).toBeInTheDocument();
  });
});
