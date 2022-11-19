import { CardProductModel } from '../models/card-product.model';

export class CardProductsState {
    public cardProducts: CardProductModel[] = [];
}

export enum CardProductActionType {
    cardProductsDownloaded = "cardProductsDownloaded",
    cardProductAdded = "cardProductAdded",
    cardProductUpdated = "cardProductUpdated",
    cardProductDeleted = "cardProductDeleted"
}

export interface CardProductAction {
    type: CardProductActionType;
    payload: any;
}

export function cardProductsDownloadedAction(products: CardProductModel[]): CardProductAction {
    return { type: CardProductActionType.cardProductsDownloaded, payload: products };
}
export function CardProductAddedAction(product: CardProductModel): CardProductAction {
    return { type: CardProductActionType.cardProductAdded, payload: product };
}
export function cardProductUpdatedAction(product: CardProductModel): CardProductAction {
    return { type: CardProductActionType.cardProductUpdated, payload: product };
}
export function cardProductDeletedAction(_id: string): CardProductAction {
    return { type: CardProductActionType.cardProductDeleted, payload: _id };
}

export function cardProductsReducer(currentState: CardProductsState = new CardProductsState(), action: CardProductAction): CardProductsState {
    const newState = { ...currentState };

    switch (action.type) {

        case CardProductActionType.cardProductsDownloaded: {
            newState.cardProducts = action.payload;
            break;
        }

        case CardProductActionType.cardProductAdded: {
            newState.cardProducts.push(action.payload);
            break;
        }

        case CardProductActionType.cardProductUpdated: {
            const index = newState.cardProducts.findIndex(p => p._id === action.payload._id);
            newState.cardProducts[index] = action.payload;
            break;
        }

        case CardProductActionType.cardProductDeleted: {
            const index = newState.cardProducts.findIndex(p => p._id === action.payload);
            newState.cardProducts.splice(index, 1);
            break;
        }

    }
    return newState;
}
