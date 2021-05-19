import { USE_MARKETS } from './markets';

export const findTVMarketFromAddress = (marketAddressString: string) => {
  console.log("findTV marketAddressString: " + marketAddressString);
  USE_MARKETS.forEach((market) => {
    if (market.address.toBase58() === marketAddressString) {
      return market.name;
    }
  });
  return 'SDOGE/USDC';
};
