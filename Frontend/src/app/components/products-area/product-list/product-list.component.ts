import { productsDownloadedAction } from './../../../redux/products-state';
import { CardProductModel } from './../../../models/card-product.model';
import { UserModel } from 'src/app/models/user.model';
import { NotifyService } from './../../../services/notify.service';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { ProductModel } from './../../../models/product.model';
import { CategoryModel } from './../../../models/category.model';
import { Component, Input, OnInit, EventEmitter } from '@angular/core';
import { CardModel } from 'src/app/models/card.model';
import store from 'src/app/redux/store';
import { CardProductAddedAction } from 'src/app/redux/card-product-state';
import { OrderModel } from 'src/app/models/order.model';

@Component({
    selector: 'app-product-list',
    templateUrl: './product-list.component.html',
    styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

    public categories: CategoryModel[];
    public products: ProductModel[];
    public card: CardModel;
    public cardProducts: CardProductModel[] = [];
    public user: UserModel;
    public toOrder: boolean = true;
    public textToSearch: string;
    public searching: boolean = false;
    public totalPrice: number;
    public order: OrderModel;
    public check: number = 1;

    constructor(private http: HttpClient, private notify: NotifyService) { }

    async ngOnInit() {
        try {
            this.user = store.getState().authState.user;
            this.categories = await this.http.get<CategoryModel[]>(environment.categoryUrl).toPromise();
            this.card = await this.http.get<CardModel>(environment.cardsUrl + "by-date/" + this.user._id).toPromise();
            this.cardProducts = await this.http.get<CardProductModel[]>(environment.cardsProductsUrl + this.card._id).toPromise();
            this.products = await this.http.get<ProductModel[]>(environment.productsUrl).toPromise();
            this.order = await this.http.get<OrderModel>(environment.ordersUrl + "by-user/" + this.user._id).toPromise();

            if (this.order) {
                if (this.card._id == this.order.cardId) {
                    this.check = 3;
                }
                else {
                    this.check = 2;
                }
            }
            else if (this.card) {
                this.check = 2;
            }
            else {
                this.check = 1;
            }
        }
        catch (err: any) {
            this.notify.error(err.message);
        }
    }

    public async getProducts(args: Event) {
        try {
            const _id = (args.target as HTMLButtonElement).value;
            this.products = await this.http.get<ProductModel[]>(environment.productsByCategoryUrl + _id).toPromise();
            store.dispatch(productsDownloadedAction(this.products));
        }
        catch (err: any) {
            this.notify.error(err.message);
        }
    }

    public async getAllProducts() {
        try {
            this.products = await this.http.get<ProductModel[]>(environment.productsUrl).toPromise();
            store.dispatch(productsDownloadedAction(this.products));
        }
        catch (err: any) {
            this.notify.error(err.message);
        }
    }

    public async onAddProduct(cardProduct: CardProductModel) {
        try {
            store.dispatch(CardProductAddedAction(cardProduct));
            this.cardProducts.push(cardProduct);
        }
        catch (err: any) {
            this.notify.error(err.message);
        }
    }

    public clear(): void {
        this.searching = false;
        this.textToSearch = "";
    }

    public async search () {
        try {
            this.searching = true;
            this.products = await this.http.get<ProductModel[]>(environment.searchProductsUrl + this.textToSearch).toPromise();
        }
        catch (err: any) {
            this.notify.error(err.message);
        }
    }

    public toPayment(totalPrice:number){
        this.totalPrice = totalPrice;
        this.toOrder = false;
    }

    public backToOrder() {
        this.toOrder = true;
    }
}
