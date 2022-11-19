import { CityModel } from './city.model';
import { CardModel } from './card.model';
import { UserModel } from 'src/app/models/user.model';

export class OrderModel {
    public _id: string;
    public userId: string;
    public user: UserModel;
    public cardId: string;
    public card: CardModel;
    public price: number;
    public cityId: string;
    public city: CityModel;
    public street: string;
    public deliveryDate: Date;
    public orderDate: Date;
    public creditCard: number;
}