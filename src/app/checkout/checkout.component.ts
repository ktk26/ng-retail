import { Component, OnInit } from "@angular/core";
import { CheckoutService } from './checkout.service';
import { Router } from '@angular/router';

@Component({
    selector: 'checkout',
    templateUrl: './checkout.component.html',
    styleUrls: ['./checkout.component.less']
})

export class CheckoutComponent implements OnInit {
    product: any;
    orderSuccess = false;
    orderPlaced = false;

    constructor(private checkoutService: CheckoutService, private router: Router) { }
    placeOrder(quantity) {
        this.orderPlaced = false;
        this.orderSuccess = false;
        this.checkoutService.placeOrder(parseInt(quantity))
            .subscribe((data) => {
                this.orderSuccess = true;
                this.orderPlaced = true;
            });
        return false;
    }

    ngOnInit() {
        this.product = this.checkoutService.product;
        if (!this.product) {
            this.router.navigate(['']);
        }
    }
}