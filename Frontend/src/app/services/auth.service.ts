import { CredentialsModel } from './../models/credentials.model';
import { environment } from 'src/environments/environment';
import { UserModel } from './../models/user.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import store from '../redux/store';
import { userLoggedInAction, userLoggedOutAction, userRegisteredAction } from '../redux/auth-state';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    constructor(private http: HttpClient) { }

    public async register(user: UserModel) {
        const addedUser = await this.http.post<UserModel>(environment.registerUrl, user).toPromise();
        store.dispatch(userRegisteredAction(addedUser))
        return addedUser;
    }

    public async login(credentials: CredentialsModel) {
        const loggedInUser = await this.http.post<UserModel>(environment.loginUrl, credentials).toPromise();
        store.dispatch(userLoggedInAction(loggedInUser));
        return loggedInUser;
    }

    public logout() {
        store.dispatch(userLoggedOutAction());
    }
}