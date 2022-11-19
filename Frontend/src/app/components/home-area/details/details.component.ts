import { CardModel } from './../../../models/card.model';
import { ProductModel } from './../../../models/product.model';
import { environment } from 'src/environments/environment';
import { NotifyService } from './../../../services/notify.service';
import { HttpClient } from '@angular/common/http';
import { OrderModel } from './../../../models/order.model';
import { UserModel } from 'src/app/models/user.model';
import { Component, OnInit } from '@angular/core';
import store from 'src/app/redux/store';

@Component({
    selector: 'app-details',
    templateUrl: './details.component.html',
    styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {

    public user: UserModel;
    public orders: OrderModel;
    public order: OrderModel;
    public card: CardModel;
    public products: ProductModel;
    public check: number = 1;

    constructor(private http: HttpClient, private notify: NotifyService) { }

    async ngOnInit() {
        try {
            this.user = store.getState().authState.user;
            this.products = await this.http.get<ProductModel>(environment.productsCountsUrl).toPromise();
            this.orders = await this.http.get<OrderModel>(environment.ordersCountUrl).toPromise();
            if (this.user) {
                this.order = await this.http.get<OrderModel>(environment.ordersUrl + "by-user/" + this.user._id).toPromise();
                this.card = await this.http.get<CardModel>(environment.cardsUrl + "by-date/" + this.user._id).toPromise();
            }
            if (this.order) {
                if (this.card._id == this.order.cardId) {
                    this.check = 3;
                }
                else {
                    this.check = 2;
                }
            }
            else if (this.card) {
                this.check = 3;
            }
            else {
                this.check = 1;
            }

        }
        catch (err:any) {
            this.notify.error(err.message);
        }
    }

}
