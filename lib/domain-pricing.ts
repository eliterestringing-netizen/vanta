const DOMESTIC_CARD_RATE = 0.017;
const DOMESTIC_CARD_FIXED_FEE = 0.3;
const MINIMUM_NET_PROFIT = 5;

/** Returns the customer price required to retain at least A$5 after a standard domestic card fee. */
export function retailPriceFromCost(cost: number) {
  const priceBeforeRounding = (cost + DOMESTIC_CARD_FIXED_FEE + MINIMUM_NET_PROFIT) / (1 - DOMESTIC_CARD_RATE);
  return Math.ceil(priceBeforeRounding * 20) / 20;
}
