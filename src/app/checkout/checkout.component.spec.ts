import { waitForAsync, TestBed, ComponentFixture } from "@angular/core/testing";
import { CheckoutComponent } from './checkout.component';
import { CheckoutService } from './checkout.service';
import { Router } from '@angular/router';
import { mockProductList } from '../productlist/mockProductList';


describe('Checkout Component', () => {
    let comp: CheckoutComponent;
    let checkoutServiceStub: Partial<CheckoutService>;
    let fixture: ComponentFixture<CheckoutComponent>;
    let el: HTMLElement;

    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    beforeEach(waitForAsync(() => {
        checkoutServiceStub = {
            product: mockProductList[3]
        };
        TestBed.configureTestingModule({
            declarations: [CheckoutComponent],
            providers: [
                { provide: CheckoutService, useValue: checkoutServiceStub },
                { provide: Router, useValue: routerSpy }
            ]
        }).compileComponents();
        fixture = TestBed.createComponent(CheckoutComponent);
        comp = fixture.componentInstance;
        fixture.detectChanges();
        el = fixture.nativeElement.querySelector('.checkout');
    }));

    it('should display added product', () => {
        comp.ngOnInit();
        const content = el.textContent;
        expect(content).toContain(mockProductList[3].productName, 'Has Product Name');
    });

    it('should navigate to product list if there is no product', () => {
        let router: Router;
        checkoutServiceStub.product = null;
        comp.ngOnInit();
        const spy = routerSpy.navigate;
        const navArgs = spy.calls.first().args[0];
        expect(navArgs).toEqual([''], 'should redirect to product list');
    });
});