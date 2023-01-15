import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PublicComponent } from './public.component';
import { HomeComponent } from './home/home.component';
import { ShopComponent } from './shop/shop.component';
import { AppRoutingModule } from '../app-routing.module';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    PublicComponent,
    HomeComponent,
    ShopComponent
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    RouterModule,
  ]
})
export class PublicModule { }
