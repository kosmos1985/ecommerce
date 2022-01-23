import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Collection } from 'src/app/models/collection';
import { CollectionsService } from 'src/app/services/collections.service';

@Component({
  selector: 'app-women',
  templateUrl: './women.component.html',
  styleUrls: ['./women.component.scss']
})
export class WomenComponent implements OnInit, OnDestroy {
  
  womenCollection : Collection []=[];

  private subscription = new Subscription();

  constructor(private http: CollectionsService) { }

  ngOnInit(): void {
    const sub = this.http.getWoenCollection().subscribe(collection => {
      this.womenCollection = collection;
    }, error => console.error(error),
      () => console.log('Complite')
    );
    this.subscription.add(sub);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
