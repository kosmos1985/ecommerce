import { Component, Input, OnInit } from '@angular/core';
import { Collection } from 'src/app/models/collection';
import { CollectionsService } from 'src/app/services/collections.service';

@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.scss']
})
export class CartItemComponent implements OnInit {
  @Input()
  cartItem!: { item: Collection; amount: number; };

  constructor(private http: CollectionsService) { }

  ngOnInit(): void {
  }


  decrease(item : any) {
    this.http.decrease(item);
  };

  increase(item: any) {
    this.http.increase(item);
  };

}
