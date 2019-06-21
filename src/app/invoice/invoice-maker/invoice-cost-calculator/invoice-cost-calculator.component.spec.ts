import { UtilsService } from './../utils.service';
import { InvoiceCostCalculatorComponent } from './invoice-cost-calculator.component';
import { InvoiceMakerModule } from './../../invoice-maker.module';
import { TestBed, ComponentFixture, async } from '@angular/core/testing';

const utilsService: UtilsService = new UtilsService();

fdescribe('InvoiceCostCalculatorComponent methods', () => {
    let component: InvoiceCostCalculatorComponent;
    let fixture: ComponentFixture<InvoiceCostCalculatorComponent>;
  
    beforeEach(async(() => {
      TestBed.configureTestingModule({
        imports: [
          InvoiceMakerModule
        ],
        providers: [
            { provide: UtilsService, useValue: utilsService }
        ]
    
      })
      .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(InvoiceCostCalculatorComponent);
        component = fixture.debugElement.componentInstance;

        component.products = [
            {
                code: "AAAAA",
                description: "AAAAA",
                quantity: 5,
                unitPriceWithVat: 5.55,
                vatRate: 22,
                netPrice: 21.65
            },
            {
                code: "BBBBB",
                description: "BBBBB",
                quantity: 2,
                unitPriceWithVat: 3.55,
                vatRate: 4,
                netPrice: 6.82
            },
            {
                code: "CCCCC",
                description: "CCCCC",
                quantity: 11,
                unitPriceWithVat: 3.81,
                vatRate: 10,
                netPrice: 37.73
            }
        ];
    });
    
    it('InvoiceCostCalculatorComponent - getSubtotal(): number', () => {
        const result = 66.20;

        expect( component.getSubtotal() ).toEqual( result );
    });

    it('InvoiceCostCalculatorComponent - getTotal(): number - without DISCOUNT', () => {
        const result = 66.20;
        component.roundAndDiscount = false;

        expect( component.getTotal() ).toEqual( result );
    });

    it('InvoiceCostCalculatorComponent - getTotal(): number - with DISCOUNT', () => {
        const result = 61.00;
        component.roundAndDiscount = true;
        component.discount = '€5.10';

        expect( component.getTotal() ).toEqual( result );
    });

});