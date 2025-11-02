export const DEMO_TRANSACTIONS = [
  // Income
  { id: "1", date: "2024-11-01", description: "Salary", amount: 3500, category: "Income", type: "income" },
  { id: "2", date: "2024-10-01", description: "Salary", amount: 3500, category: "Income", type: "income" },
  { id: "3", date: "2024-09-01", description: "Salary", amount: 3500, category: "Income", type: "income" },
  { id: "4", date: "2024-11-15", description: "Freelance Project", amount: 750, category: "Income", type: "income" },

  // Expenses - Rent
  { id: "5", date: "2024-11-05", description: "Monthly Rent", amount: -1200, category: "Rent", type: "expense" },
  { id: "6", date: "2024-10-05", description: "Monthly Rent", amount: -1200, category: "Rent", type: "expense" },
  { id: "7", date: "2024-09-05", description: "Monthly Rent", amount: -1200, category: "Rent", type: "expense" },

  // Expenses - Groceries
  { id: "8", date: "2024-11-20", description: "Whole Foods", amount: -85.5, category: "Groceries", type: "expense" },
  { id: "9", date: "2024-11-18", description: "Trader Joe's", amount: -62.4, category: "Groceries", type: "expense" },
  { id: "10", date: "2024-11-15", description: "Safeway", amount: -103.2, category: "Groceries", type: "expense" },
  { id: "11", date: "2024-11-10", description: "Whole Foods", amount: -78.35, category: "Groceries", type: "expense" },
  { id: "12", date: "2024-11-08", description: "Trader Joe's", amount: -55.8, category: "Groceries", type: "expense" },

  // Expenses - Transportation
  {
    id: "13",
    date: "2024-11-22",
    description: "Gas - Shell",
    amount: -45.0,
    category: "Transportation",
    type: "expense",
  },
  {
    id: "14",
    date: "2024-11-15",
    description: "Gas - Chevron",
    amount: -48.5,
    category: "Transportation",
    type: "expense",
  },
  {
    id: "15",
    date: "2024-11-01",
    description: "Gas - Shell",
    amount: -42.0,
    category: "Transportation",
    type: "expense",
  },
  {
    id: "16",
    date: "2024-10-20",
    description: "Uber Ride",
    amount: -18.75,
    category: "Transportation",
    type: "expense",
  },

  // Expenses - Dining
  { id: "17", date: "2024-11-21", description: "Chipotle", amount: -15.5, category: "Dining", type: "expense" },
  { id: "18", date: "2024-11-19", description: "Thai Restaurant", amount: -48.3, category: "Dining", type: "expense" },
  { id: "19", date: "2024-11-17", description: "Coffee Shop", amount: -6.5, category: "Dining", type: "expense" },
  { id: "20", date: "2024-11-14", description: "Pizza Place", amount: -32.0, category: "Dining", type: "expense" },
  { id: "21", date: "2024-11-10", description: "Sushi Restaurant", amount: -55.2, category: "Dining", type: "expense" },
  { id: "22", date: "2024-11-05", description: "Burger King", amount: -12.75, category: "Dining", type: "expense" },

  // Expenses - Entertainment
  {
    id: "23",
    date: "2024-11-20",
    description: "Netflix Subscription",
    amount: -15.99,
    category: "Entertainment",
    type: "expense",
  },
  {
    id: "24",
    date: "2024-11-15",
    description: "Movie Tickets",
    amount: -28.0,
    category: "Entertainment",
    type: "expense",
  },
  {
    id: "25",
    date: "2024-11-10",
    description: "Spotify Premium",
    amount: -11.99,
    category: "Entertainment",
    type: "expense",
  },

  // Expenses - Utilities
  {
    id: "26",
    date: "2024-11-01",
    description: "Electric Bill",
    amount: -125.0,
    category: "Utilities",
    type: "expense",
  },
  {
    id: "27",
    date: "2024-10-01",
    description: "Electric Bill",
    amount: -118.5,
    category: "Utilities",
    type: "expense",
  },
  {
    id: "28",
    date: "2024-09-01",
    description: "Electric Bill",
    amount: -132.0,
    category: "Utilities",
    type: "expense",
  },
]

export const DEMO_BUDGETS = [
  { category: "Groceries", limit: 500, spent: 385.25 },
  { category: "Transportation", limit: 200, spent: 154.25 },
  { category: "Dining", limit: 300, spent: 169.75 },
  { category: "Entertainment", limit: 100, spent: 55.98 },
  { category: "Utilities", limit: 400, spent: 375.5 },
  { category: "Rent", limit: 1500, spent: 1200 },
]
