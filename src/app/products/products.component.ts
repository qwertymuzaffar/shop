import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { map } from 'rxjs/operators';
import { HttpService } from '../http.service';
import { Product } from '../product.interface';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit {
  products: Product[] = [];
  search: string;
  count: number;
  disabledScroll = false;

  constructor(
    private httpService: HttpService,
    private router: Router,
    private storage: Storage
  ) { }

  ngOnInit(): void {
    this.storage.get('filterText')
      .then((val: string) => this.search = val);

    this.getProducts();
  }

  getProducts(): void {
    this.httpService.products$
      .pipe(map((products: Product[]) => {
        return products.filter((product: Product) => {
          return product.name.toLowerCase().includes((this.search || '').toLowerCase());
        });
      }))
      .subscribe((products: Product[]) => {
        this.count = 12;
        this.products = products;
        this.disabledScroll = products.length <= this.count;
      });
  }

  detail(product: Product): void {
    this.storage.set('product', product);
    this.router.navigate([`list/${product.guid}`]);
  }

  filter(): void {
    this.storage.set('filterText', this.search);
    this.getProducts();
  }

  loadData(event): void {
    setTimeout(() => {
      this.count += 12;
      event.target.complete();
    }, 500);
  }
}
