import { Component, OnInit } from '@angular/core';
import { Collection } from 'src/app/models/collection';
import { CollectionsService } from 'src/app/services/collections.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  cartItems: { item: Collection; amount: number; }[] = [];
  total:any = 0;

  constructor(private http: CollectionsService) { }

  ngOnInit(): void {   
    this.total = this.http.total;
    this.http.getCartItems()
      .subscribe(
        (cartItems) => {this.cartItems = cartItems}
    );

    this.http.newTotal.subscribe(
      (data) => {
        this.total = data;
        console.log(this.total.total);
      }
    );
  }


  printCart() {
    console.log(`Sum to be paid: ${this.total.total} zł`, this.http.cartItems );
};

}
