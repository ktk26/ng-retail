import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

const PRODUCT_URL = '/api/Product';

@Injectable()
export class ProductListService {

    constructor(private http: HttpClient) { }

    getProductList() {
        return this.http.get(PRODUCT_URL);
    }

    putProduct(product) {
        return this.http.post(PRODUCT_URL, product);
    }

}