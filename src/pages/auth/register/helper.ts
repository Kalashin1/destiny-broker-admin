// Hardcoded List of Common ISO 4217 Currency Codes
const COMMON_CURRENCY_CODES = [
  "USD",
  "EUR",
  "GBP",
  "JPY",
  "CAD",
  "AUD",
  "CHF",
  "CNY",
  "INR",
  "BRL",
  "ZAR",
  "RUB",
  "NGN",
];

export function getCommonCurrencySymbols(locale = "en-US") {
  return COMMON_CURRENCY_CODES.map((code) => {
    try {
      const formatter = new Intl.NumberFormat(locale, {
        style: "currency",
        currency: code,
      });

      // Get the symbol and a simple 'name' by formatting a number
      const parts = formatter.formatToParts(0);
      const symbol =
        parts.find((part) => part.type === "currency")?.value || code;

      
      const name =
        new Intl.DisplayNames([locale], { type: "currency" }).of(code) || code;

      return {
        currency: name,
        symbol: symbol,
      };
    } catch (e) {
      return { currency: code, symbol: code };
    }
  });
}
