import { ProductListService } from "./productlist.service";
import { mockProductList } from './mockProductList';
import { defer } from 'rxjs';

let httpClientSpy: { get: jasmine.Spy, post: jasmine.Spy };
let productlistService: ProductListService;

function asyncData<T>(data: T) {
    return defer(() => Promise.resolve(data));
}
describe('Product List Service', () => {
    beforeEach(() => {
        httpClientSpy = jasmine.createSpyObj('HttpClient', ['get', 'post']);
        productlistService = new ProductListService(httpClientSpy as any);
    });

    it('should return list of products', () => {
        const expectedProductList = mockProductList;
        httpClientSpy.get.and.returnValue(asyncData(expectedProductList));
        productlistService.getProductList().subscribe(
            productList => expect(productList).toEqual(expectedProductList, 'expected product list'),
            fail => expect(fail).toBeNull
        );
        expect(httpClientSpy.get.calls.count()).toBe(1, 'one call');
    });

    it('should add selected product', () => {
        const selectedProduct = mockProductList[2];
        httpClientSpy.post.and.returnValue(asyncData(true));
        productlistService.putProduct(selectedProduct).subscribe(
            response => expect(response).toBeTrue()
        );
        expect(httpClientSpy.post.calls.count()).toBe(1, 'one call');
    });
});