import { Component, OnInit } from "@angular/core";
import { ProductListService } from './productlist.service';
import { CheckoutService } from '../checkout/checkout.service';
import { Router } from '@angular/router';

@Component({
    selector: 'ng-product-list',
    templateUrl: './productlist.component.html',
    styleUrls: ['./productlist.component.less']
})
export class ProductListComponent implements OnInit {
    productList;

    constructor(private productListService: ProductListService,
        private checkoutService: CheckoutService,
        private router: Router) { }

    addToCart(product) {
        this.checkoutService.product = product;
        this.router.navigate(['checkout']);
        this.productListService.putProduct(product)
            .subscribe((data) => {
                if (data) {
                    //Add success
                }
            })
    }

    getProductList() {
        this.productListService.getProductList()
            .subscribe((data) => {
                this.productList = data;
            });
    }

    ngOnInit() {
        this.getProductList();
    }
}
