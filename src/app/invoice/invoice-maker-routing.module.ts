import { NgModule } from '@angular/core';
import { Routes, RouterModule } from "@angular/router";
import { InvoiceMakerComponent } from './invoice-maker/invoice-maker.component';

const routes: Routes = [
    { path: '', component: InvoiceMakerComponent }
];

@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [ RouterModule ]
})
export class InvoiceMakerRoutingModule {}