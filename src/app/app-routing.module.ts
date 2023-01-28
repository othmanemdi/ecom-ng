import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { CategoriesComponent } from './admin/pages/categories/categories.component';
import { ColorsComponent } from './admin/pages/colors/colors.component';
import { ProductsComponent } from './admin/pages/products/products.component';
import { AuthGuard } from './guard/auth.guard';
import { LoginComponent } from './public/auth/login/login.component';
import { HomeComponent } from './public/home/home.component';
import { PublicComponent } from './public/public.component';
import { ShopComponent } from './public/shop/shop.component';

const routes: Routes = [
  {
    path: '', component: PublicComponent
    , children: [
      { path: '', component: LoginComponent },
      // { path: '', component: HomeComponent },
      { path: 'shop', component: ShopComponent },
      { path: 'login', component: LoginComponent },
    ]
  },
  {
    path: 'admin', component: AdminComponent, canActivate: [AuthGuard],
    // path: 'admin', component: AdminComponent,
    children: [
      { path: 'categories', component: CategoriesComponent },
      { path: 'colors', component: ColorsComponent },
      { path: 'products', component: ProductsComponent },
    ]
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
