import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Gallery}  from 'angular-gallery';
import { Collection } from 'src/app/models/collection';
import { CollectionsService } from 'src/app/services/collections.service';
import { Location } from '@angular/common';
import { Observable } from 'rxjs';
import { map, switchMap, take } from 'rxjs/operators';
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
  img_path1!: string;
  img_path2!: string;
  img_path3!: string;
  img_path4!: string;
  
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
      this.getStringValueFromObservableForFirstImage();
      this.getStringValueFromObservableForSecondtImage();
      this.getStringValueFromObservableForThirdtImage();
      this.getStringValueFromObservableForFourthtImage();
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

  getStringValueFromObservableForFirstImage(){
    this.item.pipe(take(1)).
    subscribe(img_path=> {
      this.img_path1 = img_path.large_img_1;
      console.log(this.img_path1);
      
    });
    
  };
  
  getStringValueFromObservableForSecondtImage(){
    this.item.pipe(take(1)).
    subscribe(img_path=> {
      this.img_path2 = img_path.large_img_2;
      console.log(this.img_path2);
    })
  };
  
  getStringValueFromObservableForThirdtImage(){
    this.item.pipe(take(1)).
    subscribe(img_path=> {
      this.img_path3 = img_path.large_img_3
    })
  };
  
  getStringValueFromObservableForFourthtImage(){
    this.item.pipe(take(1)).
    subscribe(img_path=> {
      this.img_path4 = img_path.large_img_4
    })
  };

  showGallery(index: number) {
    let prop = {
        images: [
            {path: `${this.img_path1}`},
            {path: `${this.img_path2}`},
            {path: `${this.img_path3}`},
            {path: `${this.img_path4}`},
        ],
        index
    };
    this.gallery.load(prop);
};

}
