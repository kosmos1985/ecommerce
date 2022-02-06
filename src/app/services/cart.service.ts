import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Collection } from '../models/collection';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  total: number = 0;
  totalAmount: number = 0;
  newTotal = new Subject();
  
  public cartItems: Collection[] =[];
  public products = new Subject();

  constructor() { }

  
  addProductToCart(product: Collection, amount: number) {
    this.cartItems.push(product);
    this.products.next(this.cartItems);
    this.recalculateUp(amount);
  }

 
  removeProductFromCart( total: number) {
    this.cartItems.pop();      
    this.products.next(this.cartItems);
    this.recalculateDown(total);
  };

 recalculateUp(amount: number) {
    let sum = 0;
    let amt = 0;
    for (let cartItem of this.cartItems) {
      sum += cartItem.price * amount;
      amt += amount;
    }
    this.total = sum;
    this.totalAmount = amt;
  
    this.newTotal.next({total: this.total, amount: this.totalAmount});
  };

  recalculateDown(amount: number) {
    let rem = this.total;
    let amt = this.totalAmount;
    for (let cartItem of this.cartItems) {
      rem += amount / cartItem.price;
      amt += amount;
    }
    this.total = rem;
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
    this.recalculateUp(this.totalAmount);
  };

  increase(item: any) {
    item.amount += 1;
    // this.recalculate(this.totalAmount);
  };

  emptryCart() {
    this.cartItems.length = 0;
    this.products.next(this.cartItems);
  }

  getTotalPrice() {
    let total = 0;

    this.cartItems.map(item => {
      total += item.price;
    });

    return total
  }
  
}
