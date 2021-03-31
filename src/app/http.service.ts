import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject} from 'rxjs';
import {v4 as uuidv4} from 'uuid';
import {Product} from './product.interface';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  products$ = new BehaviorSubject<Product[]>([]);

  constructor(private http: HttpClient) {
    this.getProducts();
  }

  getProducts(): void {
    this.http.get<Product[]>('../assets/api/data.json').subscribe((products: Product[]) => {
      products = products.map((product: Product) => ({...product, guid: uuidv4()}));
      this.products$.next(products);
    });
  }
}
