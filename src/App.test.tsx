import { render, screen } from "@testing-library/react";
import App from "./App";
import { vi, describe, it, expect } from "vitest";

vi.mock("next-themes", () => ({
    ThemeProvider: ({ children }: any) => <>{children}</>,
    useTheme: () => ({ theme: "light", setTheme: vi.fn() }),
}));

describe("App", () => {
    it("renders without crashing", () => {
        render(<App />);
        // Check for a text that should be always present, e.g. from the landing page
        // Using a regex for partial match since exact content might change
        // "MediCheck" or "Drug Interaction Checker"
        expect(screen.getByText(/Drug Interaction Checker/i)).toBeInTheDocument();
    });
});
