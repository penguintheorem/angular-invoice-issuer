import { Component, OnInit, Input } from '@angular/core';
import { Product } from '../../../model/Product';

@Component({
  selector: 'invoice-product-table-item',
  templateUrl: './invoice-product-table-item.component.html',
  styleUrls: ['./invoice-product-table-item.component.scss']
})
export class InvoiceProductTableItemComponent implements OnInit {
  @Input()
  public product: Product;

  constructor() { }

  ngOnInit() {
  }

}
