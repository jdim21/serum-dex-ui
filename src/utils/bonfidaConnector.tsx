import { BonfidaTrade } from './types';

export default class BonfidaApi {
  // static URL: string = 'https://serum-api.bonfida.com/';
  // static URL: string = 'http://sdoge-tvapi-dev.us-east-2.elasticbeanstalk.com/';
  static URL: string = 'http://localhost:5000/';

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

// export const BONFIDA_DATA_FEED = 'https://serum-api.bonfida.com/tv';
// export const BONFIDA_DATA_FEED = 'http://sdoge-tvapi-dev.us-east-2.elasticbeanstalk.com/tv';
export const BONFIDA_DATA_FEED = 'http://localhost:5000/tv';
