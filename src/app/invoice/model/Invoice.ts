import { Product } from './Product';

export interface Invoice {
    discount?: number,
    invoiceNumber: string,
    issuedOn: string,
    items: Product[]   
}