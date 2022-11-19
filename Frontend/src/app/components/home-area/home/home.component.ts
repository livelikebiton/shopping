import { UserModel } from 'src/app/models/user.model';
import { CredentialsModel } from './../../../models/credentials.model';
import { NotifyService } from './../../../services/notify.service';
import { AuthService } from './../../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import store from 'src/app/redux/store';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

    public credentials = new CredentialsModel();
    public user: UserModel;

    constructor(
        private myAuthService: AuthService,
        private notify: NotifyService,
        private myRouter: Router) { }

    async ngOnInit() {
        try {
            this.user = store.getState().authState.user;
        }
        catch (err: any) {
            this.notify.error(err.message);
        }
    }

    public async login() {
        try {
            await this.myAuthService.login(this.credentials);
            this.notify.success("you are logged in");
            this.myRouter.navigateByUrl("/home");
        }
        catch (err: any) {
            this.notify.error(err.message);
        }
    }
}
