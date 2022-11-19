import { Router } from '@angular/router';
import { NotifyService } from './../../../services/notify.service';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ProductModel } from './../../../models/product.model';
import { CategoryModel } from './../../../models/category.model';
import { UserModel } from 'src/app/models/user.model';
import { Component, OnInit } from '@angular/core';
import store from 'src/app/redux/store';
import { productsDownloadedAction } from 'src/app/redux/products-state';

@Component({
    selector: 'app-admin-product-list',
    templateUrl: './admin-product-list.component.html',
    styleUrls: ['./admin-product-list.component.css']
})
export class AdminProductListComponent implements OnInit {

    public user: UserModel;
    public categories: CategoryModel[];
    public products: ProductModel[];
    public product :ProductModel;
    public imageVisited: boolean;

    constructor(private http: HttpClient, private notify: NotifyService, private myRouter: Router) { }

    async ngOnInit(){
        try {
            this.user = store.getState().authState.user;
            this.categories = await this.http.get<CategoryModel[]>(environment.categoryUrl).toPromise();
        }
        catch (err: any) {
            this.notify.error(err.message);
        }
    }

    public async getProducts(_id: string) {
        try {
            this.products = await this.http.get<ProductModel[]>(environment.productsByCategoryUrl + _id).toPromise();
            store.dispatch(productsDownloadedAction(this.products));
        }
        catch (err: any) {
            alert(err.message);
        }
    }

    public async getAllProducts() {
        try {
            this.products = await this.http.get<ProductModel[]>(environment.productsUrl).toPromise();
            store.dispatch(productsDownloadedAction(this.products));
        }
        catch (err: any) {
            this.notify.error(err.message);
        }
    }

    public onEditProduct(product: ProductModel) {
        this.product = product;
    }

    public addNewProduct () {
        this.product = new ProductModel;
    }
    
    public saveImage(args: Event): void {
        this.product.imageName = (args.target as HTMLInputElement).files[0] as any;
    }
    
    public imageBlur(): void {
        this.imageVisited = true;
    }

    public async saveProduct() {
        try {
            if (this.product._id) {
                this.product = await this.http.put<ProductModel>(environment.productsUrl + this.product._id, ProductModel.convertToFormData(this.product)).toPromise();
                this.notify.success("המוצר עודכן בהצלחה");
            }
            else {
                this.product = await this.http.post<ProductModel>(environment.productsUrl, ProductModel.convertToFormData(this.product)).toPromise();
                this.notify.success("המוצר נוסף בהצלחה");
            }
        }
        catch (err: any) {
            this.notify.error(err.message);
        }
    }
}
