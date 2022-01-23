import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Collection } from 'src/app/models/collection';
import { CollectionsService } from 'src/app/services/collections.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit, OnDestroy {

  collections: Collection[] = [];
  
  private subscription = new Subscription();

  constructor(private http: CollectionsService) { }

  ngOnInit(): void {
    const sub = this.http.getCollections().subscribe(collections => {
      this.collections = collections;
    }, error => console.error(error),
      () => console.log('Complite')
    );
    this.subscription.add(sub);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  };
}
