import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Gallery}  from 'angular-gallery';
import { Collection } from 'src/app/models/collection';
import { CollectionsService } from 'src/app/services/collections.service';
import { Location } from '@angular/common';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-shoes-to-buy',
  templateUrl: './shoes-to-buy.component.html',
  styleUrls: ['./shoes-to-buy.component.scss']
})
export class ShoesToBuyComponent implements OnInit {

  cartItems!: Collection[];
  item!: Observable<Collection>;
  totalAmount!: number;
  
  index: number = 0;

  constructor(
    private gallery: Gallery,
     private route: ActivatedRoute, 
     private location: Location,
     private collectionService: CollectionsService,
     private cartService: CartService
     ) { }

  ngOnInit(): void {
    this.item = this.route.paramMap.pipe(
      map(params => +params.get('id')!),
      switchMap(id => this.collectionService.getItem(id)));
      this.cartItems = this.cartService.cartItems; 
  };

  addToBasket(item: Collection,total : number) {
    this.cartService.addProductToCart(item, total);
    this.totalAmount = this.cartService.getTotalPrice();
  };

  decrease(item : any) {
    this.cartService.decrease(item);
  };

  increase(item: any) {
    this.cartService.increase(item);
  };

  back() {
    this.location.back();
  };

  showGallery(index: number) {
    let prop = {
        images: [
            {path: `${this.item.pipe(map(params=> params.large_img_1)).toString()}`},
            {path: `${this.item.pipe(map(params=> params.large_img_2)).toString()}`},
            {path: `${this.item.pipe(map(params=> params.large_img_3)).toString()}`},
            {path: `${this.item.pipe(map(params=> params.large_img_4)).toString()}`},
        ],
        index
    };
    this.gallery.load(prop);
};

printCart() {
  console.log(`Sum to be paid: ${this.totalAmount} zł`, this.cartService.cartItems );
};

}
