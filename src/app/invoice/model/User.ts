export interface User {
    name: string;
    surname: string;
    birthDate: string;
    passportCode: string;
    country: string;
    residence: string;
    address: {
        name: string;
        code: string;
        street: string;
        cap: string;
        city: string;
    }
}