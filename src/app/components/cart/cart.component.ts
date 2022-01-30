import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { Collection } from 'src/app/models/collection';
import { CollectionsService } from 'src/app/services/collections.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  
  item!: Observable<{ item: Collection; amount: number; }[]> ;
  
  cartItems: { item: Collection; amount: number; }[] = [];
  total: any = 0;

  constructor(private http: CollectionsService, 
    private route: ActivatedRoute) { }

  ngOnInit(): void {   
    this.item = this.route.paramMap.pipe(
      map(params => +params.get('id')!),
      switchMap(id => this.http.getCartItems(id)));

    this.total = this.http.total;
    // this.http.getCartItems()
    //   .subscribe(
    //     (data) => {this.cartItems = data}
        
    // );
    console.log(this.cartItems);

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
function id(id: any) {
  throw new Error('Function not implemented.');
}

