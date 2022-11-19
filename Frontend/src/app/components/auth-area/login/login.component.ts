import { CardModel } from './../../../models/card.model';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { OrderModel } from './../../../models/order.model';
import { UserModel } from 'src/app/models/user.model';
import { CredentialsModel } from './../../../models/credentials.model';
import { Router } from '@angular/router';
import { NotifyService } from './../../../services/notify.service';
import { AuthService } from './../../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import store from 'src/app/redux/store';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

    public credentials = new CredentialsModel();
    public user: UserModel;
    public order: OrderModel;
    public card: CardModel;
    public check: number = 1;

    constructor(
        private myAuthService: AuthService,
        private http: HttpClient,
        private notify: NotifyService,
        private myRouter: Router) { }

    async ngOnInit() {
        this.checkLogin();
    }

    public async login() {
        try {
            await this.myAuthService.login(this.credentials);
            this.notify.success("you are logged in");
            this.myRouter.navigateByUrl("/home");
            this.checkLogin();
        }
        catch (err:any) {
            this.notify.error(err.message);
        }
    }

    public async checkLogin() {
        try {
            this.user = store.getState().authState.user;
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
                this.check = 2;
            }
            else {
                this.check = 1;
            }
        }
        catch (err:any) {
            this.notify.error(err.message);
        }
    }

    public async openCard() {
        try {
            let card = new CardModel();
            card.userId = this.user._id;
            this.card = await this.http.post<CardModel>(environment.cardsUrl, card).toPromise();
            this.myRouter.navigateByUrl("/products");
        }
        catch (err:any) {
            this.notify.error(err.message);
        }
    }

}
