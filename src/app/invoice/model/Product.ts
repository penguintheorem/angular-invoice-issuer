export interface Product {
    code: string;
    description: string;
    quantity: number;
    unitPriceWithVat: number;
    vatRate: number;
    netPrice?: number;
}