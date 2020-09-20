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

    constructor(private checkoutService: CheckoutService, private router: Router) { }
    placeOrder() {
        this.checkoutService.placeOrder()
            .subscribe((data) => {
                this.orderSuccess = true;
            });
    }

    ngOnInit() {
        this.product = this.checkoutService.product;
        if (!this.product) {
            this.router.navigate(['']);
        }
    }
}