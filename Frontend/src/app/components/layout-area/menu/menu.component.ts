import { UserModel } from 'src/app/models/user.model';
import { NotifyService } from './../../../services/notify.service';
import { Component, OnInit } from '@angular/core';
import store from 'src/app/redux/store';

@Component({
    selector: 'app-menu',
    templateUrl: './menu.component.html',
    styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

    public user: UserModel;

    constructor(private notify: NotifyService) { }

    async ngOnInit() {
        try {
            this.user = store.getState().authState.user;
        }
        catch (err: any) {
            this.notify.error(err.message);
        }
    }

}
