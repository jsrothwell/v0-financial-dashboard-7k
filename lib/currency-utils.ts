export function formatCurrency(amount: number, currency: string = "USD"): string {
  const symbols: Record<string, string> = {
    USD: "$",
    CAD: "CA$",
    EUR: "€",
    GBP: "£"
  }

  const formatted = Math.abs(amount).toFixed(2)
  return `${symbols[currency]}${formatted}`
}

// Or use browser's built-in formatter for proper localization:
export function formatCurrencyLocale(amount: number, currency: string = "USD"): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency,
  }).format(amount)
}
