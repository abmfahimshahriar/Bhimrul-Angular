import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { map, take } from 'rxjs/operators';
import { Observable } from 'rxjs';
import {Product} from '../models/products'

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private db: AngularFireDatabase) { }

  create(product) {
    return this.db.list('products').push(product);
  }

  getAll(): Observable<Product[]> {
    return this.db.list<Product>('/products')
      .snapshotChanges()
      .pipe(
        map(actions =>
          actions.map(a => ({ key: a.payload.key, ...a.payload.val() }))
        )
      );
  }

  get(productId): Observable<Product> {
    return this.db.object<Product>('/products/' + productId)
      .valueChanges()
      .pipe(take(1));
  }

  update(id, product) {
    return this.db.object('/products/' + id).update(product);
  }

  delete(productID) {
    return this.db.object('/products/' + productID).remove();
  }
}
