import { Component, OnInit } from '@angular/core';

import { CartService } from 'src/app/services/cart.service';


@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.scss']
})
export class CartItemComponent implements OnInit {


  cartItems: any;
  totalAmmount!: number;


  constructor(private cartService: CartService) { }

  ngOnInit(): void {

      this.cartItems = this.cartService.cartItems;
      this.totalAmmount = this.cartService.getTotalPrice();
  };

  
   removeItemFromCart(productId: number) {
    this.cartService.removeProductFromCart(productId);
  };

  emptyCart() {
    this.cartService.emptryCart();
  };

}
