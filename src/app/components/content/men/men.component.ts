import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Collection } from 'src/app/models/collection';
import { CollectionsService } from 'src/app/services/collections.service';


@Component({
  selector: 'app-men',
  templateUrl: './men.component.html',
  styleUrls: ['./men.component.scss']
})
export class MenComponent implements OnInit, OnDestroy {
  
 menCollection : Collection []=[];

 private subscription = new Subscription();

  constructor(private http: CollectionsService) { }

  ngOnInit(): void {
    const sub = this.http.getMenCollection().subscribe(collection => {
      this.menCollection = collection;
    }, error => console.error(error),
    );
    this.subscription.add(sub);
  };

  fetchSmallImg(): Collection[]{
    const image = this.menCollection.filter(path=> path.small_img);
    console.log(image);
  
    if(typeof image == 'undefined'){
     return [];
    }
    console.log(image.map(small=> Object.values(small.small_img).reverse().pop()));
    const  path = image.map(small=> Object.values(small.small_img).reverse().pop());
  
    return path;
  };

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  };

}
