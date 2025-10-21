import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import RevenueDashboard from "../views/revenue/RevenueDashboard";
import * as api from "../utils/api/endpoint";

jest.mock("../../components/drawer/index.js", () => ({
  __esModule: true,
  default: ({ children, onApply, onClear }) => (
    <div data-testid="drawer">
      <button onClick={onApply}>Apply</button>
      <button onClick={onClear}>Clear</button>
      {children}
    </div>
  ),
}));
jest.mock("../../components/button", () => ({
  __esModule: true,
  default: ({ label, onClick }) => (
    <button onClick={onClick}>
      {typeof label === "string" ? label : "Button"}
    </button>
  ),
}));
jest.mock("../../views/revenue/Filter.js", () => ({
  __esModule: true,
  default: jest.forwardRef((_, ref) => {
    if (ref) {
      ref.current = {
        applyFilter: jest.fn(),
        resetForm: jest.fn(),
      };
    }
    return <div data-testid="filter" />;
  }),
}));
jest.mock("react-chartjs-2", () => ({
  Line: () => <div data-testid="chart" />,
}));

const mockWalletData = {
  ledger_balance: 800,
  total_payout: 200,
  total_revenue: 1200,
  pending_payout: 100,
};

const mockTransactions = [
  {
    type: "withdrawal",
    status: "successful",
    amount: 500,
    date: "2025-10-10",
    metadata: { product_name: "Product A", name: "User A" },
  },
  {
    type: "deposit",
    status: "pending",
    amount: 300,
    date: "2025-10-11",
    metadata: { product_name: "Product B", name: "User B" },
  },
];

describe("RevenueDashboard Component", () => {
  beforeEach(() => {
    jest.spyOn(api, "getAPIEndpoint").mockImplementation((endpoint) => {
      if (endpoint === "wallet") return Promise.resolve(mockWalletData);
      if (endpoint === "transactions") return Promise.resolve(mockTransactions);
      return Promise.resolve(null);
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("renders wallet data and transaction list", async () => {
    render(<RevenueDashboard />);

    await waitFor(() => {
      expect(screen.getByText("USD 1000")).toBeInTheDocument();
    });

    expect(screen.getByText("USD 800")).toBeInTheDocument();
    expect(screen.getByText("USD 200")).toBeInTheDocument();
    expect(screen.getByText("USD 1200")).toBeInTheDocument();
    expect(screen.getByText("USD 100")).toBeInTheDocument();

    // Transactions
    expect(screen.getByText("Cash Withdrawal")).toBeInTheDocument();
    expect(screen.getByText("Successful")).toBeInTheDocument();
    expect(screen.getByText("USD 500")).toBeInTheDocument();
    expect(screen.getByText("Formatted Date")).toBeInTheDocument();
  });

  test("opens drawer and applies filter", async () => {
    render(<RevenueDashboard />);
    const filterButton = await screen.findByText("Filter");

    fireEvent.click(filterButton);
    expect(screen.getByTestId("drawer")).toBeInTheDocument();
    expect(screen.getByTestId("filter")).toBeInTheDocument();

    const applyBtn = screen.getByText("Apply");
    fireEvent.click(applyBtn);
  });

  test("clears filter via Clear button", async () => {
    render(<RevenueDashboard />);
    const filterButton = await screen.findByText("Filter");

    fireEvent.click(filterButton);
    const clearBtn = screen.getByText("Clear");
    fireEvent.click(clearBtn);
  });

  test("shows correct number of transactions", async () => {
    render(<RevenueDashboard />);
    const header = await screen.findByText(/2 Transactions/i);
    expect(header).toBeInTheDocument();
  });
});
