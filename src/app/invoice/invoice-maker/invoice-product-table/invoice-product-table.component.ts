import { Observable, timer } from 'rxjs';
import { Invoice } from './../../model/Invoice';
import { InvoiceMakerService } from './../invoice-maker.service';
import { Product } from './../../model/Product';
import { Component, OnInit } from '@angular/core';
import { User } from '../../model/User';

@Component({
  selector: 'invoice-product-table',
  templateUrl: './invoice-product-table.component.html',
  styleUrls: ['./invoice-product-table.component.scss']
})
export class InvoiceProductTableComponent implements OnInit {
  public headers: string[] = [
    'Code',
    'Description',
    'Qty.',
    'Price',
    'VAT',
    'Net'
  ];
  public user: User = {
    name: 'Alan',
    surname: 'Smit',
    birthDate: '25/07/1980',
    passportCode: 'B0987987',
    country: 'Italy',
    residence: 'Switzerland',
    address: {
      name: 'Blue Apparell',
      code: '07647380968',
      street: 'Via Milano, 1',
      cap: '20091',
      city: 'Milano - IT'
    }
  };
  public products: Product[] = [];
  public discount: number = 0.00;
  public invoiceNum: string = '';
  public issuedDate: string = '';
  public invoiceMade = false;
  public error = '';
  

  constructor(
    private invoiceMakerService: InvoiceMakerService
  ) { }

  ngOnInit() {
  }

  onProductAdded(product: Product) {
    this.products = [ ...this.products, product ];
  }

  onDeleteProduct(idx: number): void {
    this.products = [ ...this.products.slice(0, idx), ...this.products.slice(idx + 1, this.products.length) ];
  }
  
  onDiscountApplied(discount: number): void {
    this.discount = discount;
  }

  onProductsSubmit(): void {
    this.invoiceMakerService.submitProducts({ 
        discount: this.discount,
        items: this.products.map( (product) => {
          return { 
            code: product.code,
            description: product.description,
            quantity: product.quantity,
            unitPriceWithVat: product.unitPriceWithVat,
            vatRate: product.vatRate
           } 
        })
    }).subscribe( {
        next: (invoice: Invoice) => {
          this.invoiceNum = invoice.invoiceNumber;
          this.issuedDate = invoice.issuedOn;
          this.invoiceMade = true;
          this.invoiceMakerService.disableAddProductForm();
        },
        error: (err: Error) => {
          this.error = `Error during Invoice Creation Request: ${err.message}`;
          timer(5000)
            .subscribe( () => { this.error = ''; } );
        }
      } );
  }

}
