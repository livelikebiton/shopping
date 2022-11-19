import { UserModel } from 'src/app/models/user.model';

export class CardModel {
    public _id: string;
    public userId: string;
    public user: UserModel;
    public createDate: Date;
}