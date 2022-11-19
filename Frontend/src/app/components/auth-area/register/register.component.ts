import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { CityModel } from './../../../models/city.model';
import { NotifyService } from './../../../services/notify.service';
import { AuthService } from './../../../services/auth.service';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { UserModel } from 'src/app/models/user.model';
import { Router } from '@angular/router';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

    public cities: CityModel[];
    public user = new UserModel();
    public step: number = 1;

    constructor(
        private http: HttpClient,
        private myAuthService: AuthService,
        private notify: NotifyService,
        private myRouter: Router) { }

    async ngOnInit() {
        try {
            this.cities = await this.http.get<CityModel[]>(environment.citiesUrl).toPromise();
        }
        catch (err: any) {
            this.notify.error(err.message);
        }
    }

    @ViewChild("registerForm")
    public myFormRef: ElementRef<HTMLFormElement>;

    public async register() {
        try {
            await this.myAuthService.register(this.user);
            this.notify.success("You are registered");
            this.myRouter.navigateByUrl("/home");
        }
        catch (err:any) {
            this.notify.error(err.message);
        }
    }

    public nextStep() {
        try {
            const isValid = this.myFormRef.nativeElement.checkValidity();
            if (!isValid) {
                this.notify.error("חלק מהפרטים לא מולאו")
                return;
            }
            if (this.user.password === this.user.confirmPassword) {
                this.step = 2;
            }
            else {
                this.notify.error("הסיסמא ואימות הסיסמא אינן תואמות");
            }
        }
        catch (err:any) {
            this.notify.error(err.message);
        }
    }
}
