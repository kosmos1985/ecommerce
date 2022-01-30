import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Gallery}  from 'angular-gallery';
import { Collection } from 'src/app/models/collection';
import { CollectionsService } from 'src/app/services/collections.service';
import { Location } from '@angular/common';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-shoes-to-buy',
  templateUrl: './shoes-to-buy.component.html',
  styleUrls: ['./shoes-to-buy.component.scss']
})
export class ShoesToBuyComponent implements OnInit {


  item!: Observable<Collection>;
  
  index: number = 0;

  constructor(
    private gallery: Gallery,
     private route: ActivatedRoute, 
     private location: Location,
     private http: CollectionsService) { }

  ngOnInit(): void {
    this.item = this.route.paramMap.pipe(
      map(params => +params.get('id')!),
      switchMap(id => this.http.getItem(id)))
  };

  back() {
    this.location.back();
  };

  showGallery(index: number) {
    let prop = {
        images: [
            {path: this.item.pipe(map(params=> params.large_img_1)).toString()},
            {path: this.item.pipe(map(params=> params.large_img_2)).toString()},
            {path: this.item.pipe(map(params=> params.large_img_3)).toString()},
            {path: this.item.pipe(map(params=> params.large_img_4)).toString()},
        ],
        index
    };
    this.gallery.load(prop);
};

}
