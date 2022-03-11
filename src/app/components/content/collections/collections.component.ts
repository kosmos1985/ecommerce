import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Collection } from 'src/app/models/collection';
import { CollectionsService } from 'src/app/services/collections.service';

@Component({
  selector: 'app-collections',
  templateUrl: './collections.component.html',
  styleUrls: ['./collections.component.scss']
})
export class CollectionsComponent implements OnInit, OnDestroy {

  collections: Collection[] = [];
  private subscription = new Subscription();
  isFetching = false;
 

  constructor(private http: CollectionsService) { }

  ngOnInit(): void {
    this.fetchCollections();
  };


  private fetchCollections(){
    this.isFetching = true;
    const sub = this.http.getCollections().subscribe(collections => {
      this.isFetching = false;
      this.collections = collections;
      console.log(this.collections);
      
    }, error => console.error(error),
    );
    this.subscription.add(sub);
  };

  // const image = this.collections.find(imgPath=> imgPath.small_img.find(path =>path.img == "small_img_1" ))?.small_img;
  // const image = this.collections.find(imgPath=> imgPath.small_img)?.small_img[0];
  fetchSmallImg(): Collection[]{
    const image = this.collections.filter(path=> path.small_img);
    console.log(image);
  
    if(typeof image == 'undefined'){
     return [];
    }
    console.log(image.map(small=> Object.values(small.small_img).reverse().pop()));
    const  path = image.map(small=> Object.values(small.small_img).reverse().pop());
  
    return path;
  };
  
  ngOnDestroy() {
    this.subscription.unsubscribe();
  };
}
