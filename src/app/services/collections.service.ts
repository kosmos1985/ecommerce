import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, Subject } from 'rxjs';
import { tap, map, filter } from 'rxjs/operators';
import { Collection } from '../models/collection';

@Injectable({
  providedIn: 'root'
})
export class CollectionsService {
  
  cartItems: {item: Collection, amount: number}[] = [];
  total: number = 0;
  totalAmount: number = 0;
  newTotal = new Subject();
  

  BASE_URL = 'http://localhost:3000/collections';

  constructor(private http: HttpClient) { }
 
  getCollections() {
    return this.http.get<Collection>(this.BASE_URL).pipe(map(arr => arr.sort((a: Collection, b: Collection) => a.company === b.company ? 0 : a.company ? 1 : -1)));
  };

  getMenCollection(){
    return this.http.get<Collection>(this.BASE_URL).pipe(map(items => items.filter(item => item.sex === "Men")));
  };

  getWoenCollection(){
    return this.http.get<Collection>(this.BASE_URL).pipe(map(items => items.filter(item => item.sex === 'Women')));
  };

   getCartItems(): Observable<{item: Collection, amount: number}[]> {
    return of(this.cartItems)
  };

  addToCart(item: Collection, amount: number) {
    let m = this.cartItems.find((cartItem)=>{return cartItem.item == item});
    if (m) {
      m.amount += amount;
    } else {
      this.cartItems.push({item: item, amount: amount});
    }
    this.recalculate();
  };
  
 recalculate() {
    let sum = 0;
    let amt = 0;
    for (let cartItem of this.cartItems) {
      sum += cartItem.item.price * cartItem.amount;
      amt += cartItem.amount;
    }
    this.total = sum;
    this.totalAmount = amt;
    this.newTotal.next({total: this.total, amount: this.totalAmount});
  };

  decrease(item: any) {
    if (item.amount > 1) {
      item.amount -= 1;
    } else if (item.amount = 1) {
      let index = this.cartItems.indexOf(item);
      this.cartItems.splice(index, 1);
    }
    this.recalculate();
  };

  increase(item: any) {
    item.amount += 1;
    this.recalculate();
  };

}
