import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin.component';
import { AppRoutingModule } from '../app-routing.module';
import { RouterModule } from '@angular/router';
import { CategoriesComponent } from './pages/categories/categories.component';

import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NavComponent } from './body/nav/nav.component';
import { ProductsComponent } from './pages/products/products.component';
import { ColorsComponent } from './pages/colors/colors.component';


@NgModule({
  declarations: [
    AdminComponent,
    CategoriesComponent,
    NavComponent,
    ProductsComponent,
    ColorsComponent
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    RouterModule,
    ReactiveFormsModule,
    HttpClientModule
  ]
})
export class AdminModule { }
