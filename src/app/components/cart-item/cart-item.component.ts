import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';


@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.scss']
})
export class CartItemComponent implements OnInit {


  cartItems: any;
  totalAmount!: number;

  constructor(private cartService: CartService) { }

  ngOnInit(): void {
      this.cartItems = this.cartService.cartItems;
      this.totalAmount = this.cartService.getTotalPrice(); 
  };

  
  removeItemFromCart(totalAmount: number) {
    this.cartService.removeProductFromCart(totalAmount);
    this.totalAmount = this.cartService.getTotalPrice();
  };

  emptyCart() {
    this.cartService.emptryCart();
  };

}
