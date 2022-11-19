import { Router } from '@angular/router';
import { OrderModel } from './../../../models/order.model';
import { UserModel } from 'src/app/models/user.model';
import { NotifyService } from './../../../services/notify.service';
import { environment } from 'src/environments/environment';
import { CityModel } from './../../../models/city.model';
import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import store from 'src/app/redux/store';
import { NgForm } from '@angular/forms';

@Component({
    selector: 'app-order',
    templateUrl: './order.component.html',
    styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {

    public cities: CityModel[];
    public city: CityModel;
    public user: UserModel;
    public order = new OrderModel();

    @Input()
    public cardId: string;
    @Input()
    public totalPrice: number;
    constructor(private http: HttpClient, private notify: NotifyService, private myRouter: Router) { }

    async ngOnInit() {
        try {
            this.user = store.getState().authState.user;
            this.cities = await this.http.get<CityModel[]>(environment.citiesUrl).toPromise();
        }
        catch (err: any) {
            this.notify.error(err.message);
        }
    }

    public async createOrder(orderForm: NgForm) {
        try {
            if (!orderForm.valid) {
                this.notify.error("יש להזין את כל השדות");
                return;
            }
            this.order.cardId = this.cardId;
            this.order.userId = this.user._id;
            this.order.price = this.totalPrice;
            this.order = await this.http.post<OrderModel>(environment.ordersUrl, this.order).toPromise();
            this.myRouter.navigateByUrl("/success");
        }
        catch (err: any) {
            this.notify.error(err.message);
        }
    }
}
