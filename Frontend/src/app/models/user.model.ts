import { CityModel } from './city.model';

export class UserModel {
    public _id: string;
    public firstName: string;
    public lastName: string;
    public identityCard: string;
    public email: string;
    public password: string;
    public confirmPassword: string;
    public cityId: string;
    public city: CityModel;
    public street: string;
    public token: string;
    public isAdmin: boolean;
}