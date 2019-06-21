import { InvoiceMakerService } from './../../invoice-maker.service';
import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
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


  constructor(
    private invoiceMakerService: InvoiceMakerService,
    private utilsService: UtilsService
  ) { }

  ngOnInit() {
    // init reactive form
    this.addProductForm = new FormGroup({
      "code": new FormControl( '' ),
      "description": new FormControl( '', [ this.minLengthWithoutDoubledSpaces, Validators.required ] ),
      "quantity": new FormControl( 1, [ Validators.min(1), Validators.required ] ),
      "unitPriceWithVat": new FormControl( '€0.00', [ Validators.min(0.00), Validators.required ] ),
      "vatRate": new FormControl( this.vats[0] ),
    });
    this.invoiceMakerService.disableAddProductFormSubject
      .subscribe( disable => {
        if(disable) {
          this.addProductForm.reset();
          this.addProductForm.get('unitPriceWithVat')
            .setValue('€0.00')
          this.addProductForm.disable();
        }
      } );
  }

  /**
   * add a product to the parent product list
   */
  onSubmit() {
    // fix price format
    this.addProductForm.value['unitPriceWithVat'] = this.utilsService.getPriceAsNumber( this.addProductForm.value['unitPriceWithVat'] );

    this.productAdded.emit({ ...this.addProductForm.value, netPrice: this.netPrice});
  }
  
  public updateNetPrice(product: Product): void {
    // first format the price field
    const unitPriceWithVatField = this.addProductForm.get('unitPriceWithVat'),
          unitPriceWithVat = this.utilsService.getPriceAsNumber(unitPriceWithVatField.value);
    const totalVat = ( this.utilsService.round((unitPriceWithVat * product.vatRate) / 100, 2) * product.quantity);
    
    unitPriceWithVatField.setValue(
      this.utilsService.roundWithCurrency(unitPriceWithVat, 2, 'EUR')
    );
    this.netPrice = this.utilsService.round(( (unitPriceWithVat * product.quantity) - totalVat), 2);
  }

  minLengthWithoutDoubledSpaces(control: FormControl): { [s: string]: boolean } {
    if(control.value && control.value.replace(/ +/g, ' ').length < 5) {
      return { 'minLengthWithoutDoubledSpaces': true };
    }
    return null;
  }

}
