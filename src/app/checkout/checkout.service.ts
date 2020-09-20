import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { v4 as uuidv4 } from 'uuid';

const ORDER_URL = '/api/OrderProducts';
@Injectable()
export class CheckoutService {
    product;

    constructor(private http: HttpClient) { }

    generateUUID() {
        return uuidv4();
    }

    placeOrder() {
        let order = this.product;
        order["orderId"] = this.generateUUID();
        return this.http.post(ORDER_URL, order);
    }
}