import { BonfidaTrade } from './types';

export default class BonfidaApi {
  // static URL: string = 'http://localhost:5000/';
  static URL: string = 'http://soltoolstv.net/';

  static async get(path: string) {
    try {
      const response = await fetch(this.URL + path);
      if (response.ok) {
        const responseJson = await response.json();
        return responseJson.success ? responseJson.data : null;
      }
    } catch (err) {
      console.log(`Error fetching from Bonfida API ${path}: ${err}`);
    }
    return null;
  }

  static async getRecentTrades(
    marketAddress: string,
  ): Promise<BonfidaTrade[] | null> {
    return BonfidaApi.get(`trades/address/${marketAddress}`);
  }
}

// export const BONFIDA_DATA_FEED = 'http://localhost:5000/tv';
export const BONFIDA_DATA_FEED = 'https://soltoolstv.net/tv';
