import { HttpClientModule } from '@angular/common/http';
import { InvoiceMakerComponent } from './invoice-maker/invoice-maker.component';
import { InvoiceCostCalculatorComponent } from './invoice-maker/invoice-cost-calculator/invoice-cost-calculator.component';
import { InvoiceMakerService } from './invoice-maker/invoice-maker.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { InvoiceProductTableComponent } from './invoice-maker/invoice-product-table/invoice-product-table.component';
import { InvoiceProductTableItemComponent } from './invoice-maker/invoice-product-table/invoice-product-table-item/invoice-product-table-item.component';
import { InvoiceProductTableAddComponent } from './invoice-maker/invoice-product-table/invoice-product-table-add/invoice-product-table-add.component';
import { InvoiceMakerRoutingModule } from './invoice-maker-routing.module';
import { UtilsService } from './invoice-maker/utils.service';


@NgModule({
    declarations: [
        InvoiceMakerComponent,
        InvoiceProductTableComponent,
        InvoiceProductTableItemComponent,
        InvoiceProductTableAddComponent,
        InvoiceCostCalculatorComponent
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        FormsModule,
        InvoiceMakerRoutingModule,
        HttpClientModule
    ],
    providers: [
        InvoiceMakerService,
        UtilsService
    ]
})
export class InvoiceMakerModule { }
  