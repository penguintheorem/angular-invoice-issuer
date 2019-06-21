import { UtilsService } from './../utils.service';
import { Component, OnInit, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';
import { Product } from 'src/app/invoice/model/Product';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'invoice-cost-calculator',
  templateUrl: './invoice-cost-calculator.component.html',
  styleUrls: ['./invoice-cost-calculator.component.scss']
})
export class InvoiceCostCalculatorComponent implements OnInit {
  @Input()
  products: Product[] = [];
  @Output() 
  discountApplied: EventEmitter<number> = new EventEmitter<number>();
  discount: number = 0.00;
  roundAndDiscount: boolean = false;
  
  
  constructor(private utilsService: UtilsService) { }

  ngOnInit() {
  }

  getSubtotal(): number {
    return this.utilsService.round(this.products.map( product => product.netPrice )
            .reduce( (sum, net) => sum + net, 0.00), 2);
  }

  getTotal(): number {
    if(this.roundAndDiscount) {
      this.roundAndDiscount = false;
      return this.utilsService.round(Math.max(0, this.utilsService.round(this.getSubtotal() - this.discount, 2)), 0);
    } else {
      return Math.max(0, this.utilsService.round(this.getSubtotal() - this.discount, 2));
    }
  }

  applyDiscount(): void {
    this.roundAndDiscount = true;
    // pass to the parent the discount value
    this.discountApplied.emit( this.discount );
  }

}
