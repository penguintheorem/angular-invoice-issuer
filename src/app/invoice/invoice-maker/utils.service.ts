import { Injectable } from '@angular/core';

const currencies: any = {
  'EUR': '€'
};

@Injectable()
export class UtilsService {

  constructor() { }

  /**
     * round n to the d-th decimal
     * 
     * @param n 
     * @param d 
     */
    public round(n: number, d: number) {
        
      return Number(Math.round( +(n + 'e' + d) ) + 'e-' + d);
    }
    
    public roundWithCurrency(n: number, d: number, currency: string) {

      return `${currencies[currency]}${this.round(n, d).toFixed(2)}`;
    }

    public getPriceAsNumber(p: string): number {

      if(p) {
        return +(p.replace('€', ''));
      } else {
        return 0;
      }
    }

}
