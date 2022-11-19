import { NotifyService } from './../../../services/notify.service';
import { HttpClient } from '@angular/common/http';
import { CardProductModel } from './../../../models/card-product.model';
import { UserModel } from 'src/app/models/user.model';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import store from 'src/app/redux/store';
import { environment } from 'src/environments/environment';

@Component({
    selector: 'app-shopping-card',
    templateUrl: './shopping-card.component.html',
    styleUrls: ['./shopping-card.component.css']
})
export class ShoppingCardComponent implements OnInit {

    @Input()
    public cardProducts: CardProductModel[];

    @Input()
    public user: UserModel;

    @Output()
    public _payment = new EventEmitter();

    @Output()
    public _back = new EventEmitter();

    public totalPrice: number;
    public cardProduct: CardProductModel;

    public isInPayment: boolean = false;

    constructor(private http: HttpClient, private notify: NotifyService) { }

    public getTotalPrice(): number {
        return this.cardProducts.reduce((totalPrice, p) => totalPrice += p.amount * p.product.price, 0);
    }

    async ngOnInit() {
        try {
            this.user = store.getState().authState.user;
        }
        catch (err: any) {
            this.notify.error(err.message);
        }
    }

    public toPayment() {
        this.isInPayment=true;
        this._payment.emit(this.getTotalPrice());
    }

    public backToCard(){
        this._back.emit();
    }

    public async deleteOneProduct (_id: string) {
        try {
            const doIt = window.confirm("בטוח?");
            if(!doIt) return;
            await this.http.delete(environment.cardsProductsUrl + _id).toPromise();
            const index = this.cardProducts.findIndex(c => c._id === _id);
            this.cardProducts.splice(index, 1);
            this.notify.success("המוצר נמחק בהצלחה!");
        }
        catch (err: any) {
            this.notify.error(err.message);
        }
    }
    public async deleteAllProductsInCard (cardId: string) {
        try {
            await this.http.delete(environment.cardsProductsUrl + "clearCard/" + cardId).toPromise();
            const index = this.cardProducts.findIndex(c => c.cardId === cardId);
            this.cardProducts.splice(index, 1);
            this.notify.success("המוצר נמחק בהצלחה!");
        }
        catch (err: any) {
            this.notify.error(err.message);
        }
    }
}
