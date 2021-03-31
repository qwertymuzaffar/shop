import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {IonicModule} from '@ionic/angular';
import {ProductsComponent} from './products.component';
import {DetailComponent} from './detail/detail.component';

const routes: Routes = [
  {path: '', component: ProductsComponent},
  {path: ':id', component: DetailComponent}
];

@NgModule({
  declarations: [
    ProductsComponent,
    DetailComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    IonicModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class ProductsModule { }
