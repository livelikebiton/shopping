import { JwtInterceptor } from './services/jwt.interceptor';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { LayoutComponent } from './components/layout-area/layout/layout.component';
import { HeaderComponent } from './components/layout-area/header/header.component';
import { FooterComponent } from './components/layout-area/footer/footer.component';
import { LogoComponent } from './components/layout-area/logo/logo.component';
import { MenuComponent } from './components/layout-area/menu/menu.component';
import { HomeComponent } from './components/home-area/home/home.component';
import { LoginComponent } from './components/auth-area/login/login.component';
import { RegisterComponent } from './components/auth-area/register/register.component';
import { AuthMenuComponent } from './components/auth-area/auth-menu/auth-menu.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { ProductListComponent } from './components/products-area/product-list/product-list.component';
import { ProductCardComponent } from './components/products-area/product-card/product-card.component';
import { InfoComponent } from './components/home-area/info/info.component';
import { DetailsComponent } from './components/home-area/details/details.component';
import { ShoppingCardComponent } from './components/products-area/shopping-card/shopping-card.component';
import { OrderComponent } from './components/products-area/order/order.component';
import { AdminProductListComponent } from './components/products-area/admin-product-list/admin-product-list.component';
import { OrderSuccessComponent } from './components/products-area/order-success/order-success.component';

@NgModule({
  declarations: [
      LayoutComponent,
      HeaderComponent,
      FooterComponent,
      LogoComponent,
      MenuComponent,
      HomeComponent,
      LoginComponent,
      RegisterComponent,
      AuthMenuComponent,
      ProductListComponent,
      ProductCardComponent,
      InfoComponent,
      DetailsComponent,
      ShoppingCardComponent,
      OrderComponent,
      AdminProductListComponent,
      OrderSuccessComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true }],
  bootstrap: [LayoutComponent]
})
export class AppModule { }
