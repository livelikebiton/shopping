import { CardProductModel } from './../../../models/card-product.model';
import { UserModel } from 'src/app/models/user.model';
import { NotifyService } from './../../../services/notify.service';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Component, OnInit } from '@angular/core';
import { OrderModel } from 'src/app/models/order.model';
import store from 'src/app/redux/store';

@Component({
    selector: 'app-order-success',
    templateUrl: './order-success.component.html',
    styleUrls: ['./order-success.component.css']
})
export class OrderSuccessComponent implements OnInit {

    public order: OrderModel;
    public user: UserModel;
    public cardProducts: CardProductModel[];

    constructor(private http: HttpClient, private notify: NotifyService) { }

    async ngOnInit() {
        try {
            this.user = store.getState().authState.user;
            this.order = await this.http.get<OrderModel>(environment.ordersUrl + "by-user/" + this.user._id).toPromise();
            this.cardProducts = await this.http.get<CardProductModel[]>(environment.cardsProductsUrl + this.order.cardId).toPromise();
        }
        catch (err: any) {
            this.notify.error(err.message);
        }
    }

    private setting = {
        element: {
          dynamicDownload: null as HTMLElement
        }
      };

    public getCardProducts() {
        let fullName = this.user.firstName + " " + this.user.lastName + " \r\n ";
        let cardProductsText = '';
        this.cardProducts.forEach(c => {
            cardProductsText += `${c.amount}  ${c.product.name} ${c.product.price} \r\n ` ;
            
        });
        let totalPrice = "לתשלום " + this.order.price + "₪" ;
        return fullName + cardProductsText + totalPrice;
    }

    dynamicDownloadTxt() {
        
        this.dyanmicDownloadByHtmlTag({
            fileName: 'My Report',
            text: this.getCardProducts()
        });

    }

    private dyanmicDownloadByHtmlTag(arg: {
        fileName: string,
        text: string
      }) {
        if (!this.setting.element.dynamicDownload) {
          this.setting.element.dynamicDownload = document.createElement('a');
        }
        const element = this.setting.element.dynamicDownload;
        const fileType = 'text/plain';
        element.setAttribute('href', `data:${fileType};
        charset=utf-8,${encodeURIComponent(arg.text)}`);
        element.setAttribute('download', arg.fileName);
    
        var event = new MouseEvent("click");
        element.dispatchEvent(event);
      }

}
