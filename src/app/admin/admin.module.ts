import { DataTableModule } from 'angular7-data-table';
import { SharedModule } from './../shared/shared.module';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminProductsComponent } from './components/admin-products/admin-products.component';
import { AdminOrdersComponent } from './components/admin-orders/admin-orders.component';
import { ProductFormComponent } from './components/product-form/product-form.component';
import { AdminAuthGaurdService as AdminAuthGaurd } from './services/admin-auth-gaurd.service';
import { RouterModule } from '@angular/router';
import { AuthGaurdService as AuthGaurd } from '../shared/services/auth-gaurd.service'

@NgModule({
  declarations: [
    AdminProductsComponent,
    AdminOrdersComponent,
    ProductFormComponent,
  ],
  imports: [
    SharedModule,
    DataTableModule,
    RouterModule.forChild([
      {path: 'admin/products/new' , component: ProductFormComponent, canActivate: [AuthGaurd,AdminAuthGaurd] },
      {path: 'admin/products/:id' , component: ProductFormComponent, canActivate: [AuthGaurd,AdminAuthGaurd] },
      {path: 'admin/products' , component: AdminProductsComponent, canActivate: [AuthGaurd,AdminAuthGaurd] },
      {path: 'admin/orders' , component: AdminOrdersComponent, canActivate: [AuthGaurd,AdminAuthGaurd] },
    ])
  ],
  providers: [
    AdminAuthGaurd
  ]
})
export class AdminModule { }
