import { OrderSuccessComponent } from './components/products-area/order-success/order-success.component';
import { AdminProductListComponent } from './components/products-area/admin-product-list/admin-product-list.component';
import { OrderComponent } from './components/products-area/order/order.component';
import { AdminGuard } from './services/admin.guard';
import { ProductListComponent } from './components/products-area/product-list/product-list.component';
import { AuthGuard } from './services/auth.guard';
import { Page404Component } from './components/share-area/page404/page404.component';
import { LogoutComponent } from './components/auth-area/logout/logout.component';
import { LoginComponent } from './components/auth-area/login/login.component';
import { RegisterComponent } from './components/auth-area/register/register.component';
import { HomeComponent } from './components/home-area/home/home.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
    { path: "home", component: HomeComponent },
    { path: "register", component: RegisterComponent },
    { path: "login", component: LoginComponent },
    { path: "logout", component: LogoutComponent },
    { path: "products", canActivate: [AuthGuard], component: ProductListComponent },
    { path: "order", canActivate: [AuthGuard], component: OrderComponent },
    { path: "success", canActivate: [AuthGuard], component: OrderSuccessComponent },
    { path: "admin-products", canActivate: [AdminGuard], component: AdminProductListComponent },
    { path: "", redirectTo: "/home", pathMatch: "full" },
    { path: "**", component: Page404Component }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
