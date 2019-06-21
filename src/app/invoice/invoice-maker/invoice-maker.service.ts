import { Product } from 'src/app/invoice/model/Product';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Invoice } from '../model/Invoice';

const API_BASE_URL = 'https://stamp-interview-apis.azurewebsites.net/api/invoices';

@Injectable()
export class InvoiceMakerService {

  constructor(private http: HttpClient) { }

  public submitProducts( productsExtended: { discount?: number, items: Product[] } ): Observable<Invoice> {
    return this.http.post<Invoice>( 
      `${API_BASE_URL}`, 
      productsExtended,
      { headers: { 'Content-Type':  'application/json' }}
    );
  }

}
