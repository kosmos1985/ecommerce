import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Collection } from 'src/app/models/collection';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.scss'],
})
export class CartItemComponent implements OnInit {
  cartItems!: Collection[];
  totalAmount!: number;

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.cartItems = this.cartService.cartItems;
    this.totalAmount = this.cartService.getTotalPrice();
  }

  fetchSmallImg(): Collection[] {
    const image = this.cartItems.filter((path) => path.small_img);

    if (typeof image == 'undefined') {
      return [];
    }

    const path = image.map((small) =>
      Object.values(small.small_img).reverse().pop()
    );

    return path;
  }

  removeItemFromCart(totalAmount: number) {
    this.cartService.removeProductFromCart(totalAmount);
    this.totalAmount = this.cartService.getTotalPrice();
  }

  emptyCart() {
    this.cartService.emptryCart();
  }
}
