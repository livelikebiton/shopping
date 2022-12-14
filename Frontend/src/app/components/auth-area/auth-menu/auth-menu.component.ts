import { Component, OnInit } from '@angular/core';
import { Unsubscribe } from 'redux';
import { UserModel } from 'src/app/models/user.model';
import store from 'src/app/redux/store';

@Component({
  selector: 'app-auth-menu',
  templateUrl: './auth-menu.component.html',
  styleUrls: ['./auth-menu.component.css']
})
export class AuthMenuComponent implements OnInit {

    public user: UserModel;
    private unsubscribeMe: Unsubscribe;

    constructor() { }

    ngOnInit(): void {
        this.unsubscribeMe = store.subscribe(() => {
            this.user = store.getState().authState.user;
        });
        this.user = store.getState().authState.user;
    }

    ngOnDestroy(): void {
        this.unsubscribeMe();
    }

}
