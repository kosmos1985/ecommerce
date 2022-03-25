import { Component, OnInit} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Gallery}  from 'angular-gallery';
import { Collection } from 'src/app/models/collection';
import { CollectionsService } from 'src/app/services/collections.service';
import { Location } from '@angular/common';
import { Observable } from 'rxjs';
import { map, switchMap} from 'rxjs/operators';
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
  };
 

  fetchFirstSmallImg(item: Collection){
    return Object.values(item.small_img)[0];
  };

  fetchSecondSmallImg(item: Collection){
    return Object.values(item.small_img)[1];
  };

  fetchThirdSmallImg(item: Collection){
    return Object.values(item.small_img)[2];
  };

  fetchFourthtSmallImg(item: Collection){
    return Object.values(item.small_img)[3];
  };

  addToBasket(item: Collection, total : number) {
    this.cartService.addProductToCart(item, total);
    this.totalAmount = this.cartService.getTotalPrice();
  };

  decrease(item : Collection, total : number) {
    this.cartService.decrease(item, total);
    this.totalAmount = this.cartService.getTotalPrice();
  };

  back() {
    this.location.back();
  };

  showGallery(index: number, item: Collection) {
    const path1: string = Object.values(item.large_img)[0];
    const path2: string = Object.values(item.large_img)[1];
    const path3: string = Object.values(item.large_img)[2];
    const path4: string = Object.values(item.large_img)[3];
    let prop = {
        images: [
            {path: `${path1}`},
            {path: `${path2}`},
            {path: `${path3}`},
            {path: `${path4}`},
        ],
        index
    };
    this.gallery.load(prop);
};

}
