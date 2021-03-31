import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Storage } from '@ionic/storage';
import { HttpService } from '../../http.service';
import { Product } from '../../product.interface';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss'],
})
export class DetailComponent implements OnInit {
  product: Product;
  form: FormGroup;

  constructor(
    private httpService: HttpService,
    private storage: Storage,
    private fb: FormBuilder
  ) {
    this.form = fb.group({
      amount: '',
      quantity: ''
    });
  }

  ngOnInit() {
    this.getProduct();
    this.calculateAmount();
    this.calculateQuantity();
  }

  getProduct(): void {
    this.storage.get('product')
      .then((product: Product) => this.product = product);
  }

  calculateAmount(): void {
    this.form.controls.amount.valueChanges
      .subscribe((val: number) => {
        const sum = +(val / this.product.price).toFixed(2);
        this.form.controls.quantity.setValue(+sum.toFixed(2) || '', {emitEvent: false});
      });
  }

  calculateQuantity(): void {
    this.form.controls.quantity.valueChanges
      .subscribe((val: number) => {
        const sum = +(val * this.product.price).toFixed(2);
        this.form.controls.amount.setValue(sum || '', {emitEvent: false});
      });
  }

  setValue(count: number, type: string): void {
    this.form.controls[type].setValue(count);
  }

}
