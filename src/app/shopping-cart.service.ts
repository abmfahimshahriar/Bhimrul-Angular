import { take, map } from 'rxjs/operators';
import { Product } from './models/products';
import { AngularFireDatabase } from 'angularfire2/database';
import { Injectable } from '@angular/core';
import {ShoppingCartItem} from './models/shopping-cart-item';
import { ShoppingCart } from './models/shopping-cart';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  constructor(private db: AngularFireDatabase) { }

  async getCart(): Promise<Observable<ShoppingCart>> {
    const cartId = await this.getOrCreateCartId();
    //return this.db.object('/shopping-carts/' + cartId).valueChanges();
    return this.db.object('/shopping-carts/' + cartId).snapshotChanges()
      .pipe(map(x => new ShoppingCart(x.payload.exportVal().items)));
  }
  
  addToCart(product: Product) {
    this.updateItem(product, 1);
  }

  removeFromCart(product: Product) {
    this.updateItem(product, -1);
  }

  async clearCart() {
    const cartId = await this.getOrCreateCartId();
    this.db.object('/shopping-carts/' + cartId + '/items').remove();
  }

  private getItem(cartId: string, productId: string) {
    return this.db.object('/shopping-carts/' + cartId + '/items/' + productId);
  }

  private create() {
    return this.db.list('shopping-carts').push({
      dateCreated: new Date().getTime()
    });
  }

  private async getOrCreateCartId(): Promise<string>{
    let cartId = localStorage.getItem('cartId');
    if(cartId) return cartId;

    let result = await this.create();
    localStorage.setItem('cartId',result.key);
    return result.key;
  }

  private async updateItem(product: Product, change: number) {
    const cartId = await this.getOrCreateCartId();
    const item = this.getItem(cartId, product.key);

    item
      .valueChanges()
      .pipe(take(1))
      .subscribe((data: ShoppingCartItem) => {
        const quantity = (data ? (data.quantity || 0) : 0) + change;

        if (!quantity)
          item.remove();

        else
          item.update({
            title: product.title,
            imageUrl: product.imageUrl,
            price: product.price,
            quantity
          });
      });
  }
}
