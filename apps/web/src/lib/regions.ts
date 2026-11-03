/**
 * Where we deliver, each with the currency a visitor there would expect.
 * Singapore first: it is home, and every price is set in its dollars. The
 * rest are the places our partner factory's export routes reach.
 */
export type Region = { code: string; name: string; currency: string; symbol: string };

export const HOME: Region = { code: "SG", name: "Singapore", currency: "SGD", symbol: "S$" };

export const REGIONS: readonly Region[] = [
  { code: "AU", name: "Australia", currency: "AUD", symbol: "$" },
  { code: "AT", name: "Austria", currency: "EUR", symbol: "€" },
  { code: "BE", name: "Belgium", currency: "EUR", symbol: "€" },
  { code: "BN", name: "Brunei", currency: "BND", symbol: "$" },
  { code: "KH", name: "Cambodia", currency: "USD", symbol: "$" },
  { code: "CA", name: "Canada", currency: "CAD", symbol: "$" },
  { code: "CN", name: "China", currency: "CNY", symbol: "¥" },
  { code: "DK", name: "Denmark", currency: "DKK", symbol: "kr" },
  { code: "FI", name: "Finland", currency: "EUR", symbol: "€" },
  { code: "FR", name: "France", currency: "EUR", symbol: "€" },
  { code: "DE", name: "Germany", currency: "EUR", symbol: "€" },
  { code: "HK", name: "Hong Kong", currency: "HKD", symbol: "$" },
  { code: "IN", name: "India", currency: "INR", symbol: "₹" },
  { code: "ID", name: "Indonesia", currency: "IDR", symbol: "Rp" },
  { code: "IE", name: "Ireland", currency: "EUR", symbol: "€" },
  { code: "IT", name: "Italy", currency: "EUR", symbol: "€" },
  { code: "JP", name: "Japan", currency: "JPY", symbol: "¥" },
  { code: "KR", name: "South Korea", currency: "KRW", symbol: "₩" },
  { code: "MO", name: "Macau", currency: "MOP", symbol: "P" },
  { code: "MY", name: "Malaysia", currency: "MYR", symbol: "RM" },
  { code: "NL", name: "Netherlands", currency: "EUR", symbol: "€" },
  { code: "NZ", name: "New Zealand", currency: "NZD", symbol: "$" },
  { code: "NO", name: "Norway", currency: "NOK", symbol: "kr" },
  { code: "PH", name: "Philippines", currency: "PHP", symbol: "₱" },
  { code: "PT", name: "Portugal", currency: "EUR", symbol: "€" },
  { code: "QA", name: "Qatar", currency: "QAR", symbol: "QR" },
  { code: "SA", name: "Saudi Arabia", currency: "SAR", symbol: "SR" },
  HOME,
  { code: "ES", name: "Spain", currency: "EUR", symbol: "€" },
  { code: "SE", name: "Sweden", currency: "SEK", symbol: "kr" },
  { code: "CH", name: "Switzerland", currency: "CHF", symbol: "CHF" },
  { code: "TW", name: "Taiwan", currency: "TWD", symbol: "$" },
  { code: "TH", name: "Thailand", currency: "THB", symbol: "฿" },
  { code: "AE", name: "United Arab Emirates", currency: "AED", symbol: "AED" },
  { code: "GB", name: "United Kingdom", currency: "GBP", symbol: "£" },
  { code: "US", name: "United States", currency: "USD", symbol: "$" },
  { code: "VN", name: "Vietnam", currency: "VND", symbol: "₫" },
];

/**
 * The languages the site may come in. English is the only one written so
 * far; the rest are Singapore's other official languages, shown as coming
 * so the choice is honest.
 */
export type Language = { code: string; name: string; ready: boolean };

export const LANGUAGES: readonly Language[] = [
  { code: "EN", name: "English", ready: true },
  { code: "ZH", name: "简体中文", ready: false },
  { code: "MS", name: "Bahasa Melayu", ready: false },
  { code: "TA", name: "தமிழ்", ready: false },
];
