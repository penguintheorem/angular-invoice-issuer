import { Injectable } from '@angular/core';

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
  
}
