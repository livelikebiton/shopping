import { CategoryModel } from './category.model';

export class ProductModel {
    public _id: string;
    public name: string;
    public categoryId: string;
    public category: CategoryModel;
    public price: number;
    public imageName: FileList;
    public image: string;

    public static convertToFormData(product: ProductModel): FormData {
        const myFormData = new FormData();
        myFormData.append("name", product.name);
        myFormData.append("categoryId", product.categoryId);
        myFormData.append("price", product.price.toString());
        if (product.image) myFormData.append("image", product.imageName as any);
        return myFormData;
    }
}