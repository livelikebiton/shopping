import { NotifyService } from './../../../services/notify.service';
import { CardProductModel } from './../../../models/card-product.model';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { ProductModel } from './../../../models/product.model';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
    selector: 'app-product-card',
    templateUrl: './product-card.component.html',
    styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent {

    @Input()
    public isAdmin: boolean;

    @Input()
    public product: ProductModel;

    @Input()
    public cardId: string;

    @Output()
    public _onAddProduct = new EventEmitter();

    @Output()
    public _onEditProduct = new EventEmitter();

    public imageUrl = environment.productImagesUrl;
    public show: boolean = false;
    public amount: number;

    constructor(private http: HttpClient, private notify: NotifyService) { }

    public async addProductToCard() {
        try {
            let cardProduct = new CardProductModel();
            cardProduct.cardId = this.cardId;
            cardProduct.productId = this.product._id;
            cardProduct.product = this.product;;
            let amountPrice = this.amount * this.product.price;
            cardProduct.amount = this.amount;
            cardProduct.priceAmount = amountPrice;
            await this.http.post<CardProductModel>(environment.cardsProductsUrl, cardProduct).toPromise();
            this._onAddProduct.emit(cardProduct);
            this.show = false;
            this.notify.success("התווסף בהצלחה");
        }
        catch (err: any) {
            this.notify.error(err.message);
        }
    }

    public async editProduct() {
        try {
            this._onEditProduct.emit(this.product);
        }
        catch (err: any) {
            this.notify.error(err.message);
        }
    }

}
