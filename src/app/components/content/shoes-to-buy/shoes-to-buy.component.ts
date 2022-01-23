import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Gallery}  from 'angular-gallery';
import { Collection } from 'src/app/models/collection';
import { CollectionsService } from 'src/app/services/collections.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-shoes-to-buy',
  templateUrl: './shoes-to-buy.component.html',
  styleUrls: ['./shoes-to-buy.component.scss']
})
export class ShoesToBuyComponent implements OnInit {

  item!: {};
  index: number = 0;

  constructor(
    private gallery: Gallery,
     private route: ActivatedRoute, 
     private location: Location,
     private http: CollectionsService) { }

  ngOnInit(): void {
    let shoes = +this.route.snapshot.paramMap.get('id');
    this.item = this.http.getItem(shoes);
    
  };

  back() {
    this.location.back();
  };

  showGallery(index: number) {
    let prop = {
        images: [
            {path: 'assets/images/image-product-1.jpg'},
            {path: 'assets/images/image-product-2.jpg'},
            {path: 'assets/images/image-product-3.jpg'},
            {path: 'assets/images/image-product-4.jpg'},
        ],
        index
    };
    this.gallery.load(prop);
};

}
