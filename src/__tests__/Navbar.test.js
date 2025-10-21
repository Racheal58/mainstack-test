import { render, screen, fireEvent } from "@testing-library/react";
import Navbar from "../layouts/Navbar";
import { BUTTONS_ITEMS } from "../utils/helpers/variableItems";

describe("Navbar Component", () => {
  test("renders Navbar and buttons", async () => {
    render(<Navbar />);
    BUTTONS_ITEMS.forEach((button) => {
      expect(screen.getByText(button.label)).toBeInTheDocument();
    });
  });

  test("handles button clicks and changes selected button state", async () => {
    render(<Navbar />);

    const revenueButton = screen.getByText("Revenue");
    expect(revenueButton).toHaveStyle("background-color: black");
    expect(revenueButton).toHaveStyle("color: white");

    const analyticsButton = screen.getByText("Analytics");
    fireEvent.click(analyticsButton);

    expect(analyticsButton).toHaveStyle("background-color: black");
    expect(analyticsButton).toHaveStyle("color: white");

    expect(revenueButton).not.toHaveStyle("background-color: black");
    expect(revenueButton).not.toHaveStyle("color: white");
  });

  test("handles Apps button click and shows dropdown", async () => {
    render(<Navbar />);

    const appsButton = screen.getByText("Apps");
    fireEvent.click(appsButton);

    const linkInBioText = screen.getByText("Link in Bio");
    expect(linkInBioText).toBeInTheDocument();

    const dropdownIcon = screen.getByRole("img", { name: /chevron down/i });
    expect(dropdownIcon).toBeInTheDocument();
  });

  test("handles click on menu item inside Apps dropdown", async () => {
    render(<Navbar />);

    const appsButton = screen.getByText("Apps");
    fireEvent.click(appsButton);

    const firstMenuItem = screen.getByText("Link in Bio");
    fireEvent.click(firstMenuItem);
  });
});
