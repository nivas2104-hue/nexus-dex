import { useContext } from "react";
import { MarketContext } from "./MarketCore";
export function useMarket() {
  return useContext(MarketContext);
}
