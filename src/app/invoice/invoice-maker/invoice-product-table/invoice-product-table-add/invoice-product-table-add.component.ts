import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Product } from '../../../model/Product';
import { UtilsService } from '../../utils.service';

@Component({
  selector: 'invoice-product-table-add',
  templateUrl: './invoice-product-table-add.component.html',
  styleUrls: ['./invoice-product-table-add.component.scss']
})
export class InvoiceProductTableAddComponent implements OnInit {
  public addProductForm: FormGroup;
  public vats: string[] = [
    '22',
    '10',
    '5',
    '4'
  ];
  public netPrice: number = 0.00;
  @Output() productAdded: EventEmitter<Product> = new EventEmitter<Product>();
  

  constructor(private utilsService: UtilsService) { }

  ngOnInit() {
    // init reactive form
    this.addProductForm = new FormGroup({
      "code": new FormControl( '' ),
      "description": new FormControl( '', [ Validators.minLength(5), Validators.required ] ),
      "quantity": new FormControl( 1, [ Validators.min(1), Validators.required ] ),
      "unitPriceWithVat": new FormControl( '0.00', [ Validators.min(0.00), Validators.required ] ),
      "vatRate": new FormControl( this.vats[0] ),
    });
  }

  /**
   * add a product to the parent product list
   */
  onSubmit() {
    this.productAdded.emit({ ...this.addProductForm.value, netPrice: this.netPrice});
  }
  
  public updateNetPrice(product: Product): void {
    console.log(product);
    const totalVat = ( this.utilsService.round((product.unitPriceWithVat * product.vatRate) / 100, 2) * product.quantity);

    this.netPrice = ( (product.unitPriceWithVat * product.quantity) - totalVat );
  }

}
