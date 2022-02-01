import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Collection } from 'src/app/models/collection';
import { CartService } from 'src/app/services/cart.service';
import { CollectionsService } from 'src/app/services/collections.service';

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
    this.cartService.getProducts().subscribe(data => {
      this.cartItems = data
    });

      this.totalAmmount = this.cartService.getTotalPrice();
  }

  
   removeItemFromCart(productId: number) {
    /* this.cartItems.map((item, index) => {
      if (item.id === productId) {
        this.cartItems.splice(index, 1);
      }
    });

    this.mySharedService.setProducts(this.cartItems); */

    this.cartService.removeProductFromCart(productId);

  }

  emptyCart() {
    this.cartService.emptryCart();
  }

}
