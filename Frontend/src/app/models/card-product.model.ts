import { ProductModel } from './product.model';
import { CardModel } from './card.model';

export class CardProductModel {
    public _id: string;
    public cardId: string;
    public card: CardModel;
    public productId: string;
    public product: ProductModel;
    public amount: number;
    public priceAmount: number;
}