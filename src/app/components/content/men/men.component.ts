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
      this.menCollection = [collection];
    }, error => console.error(error),
      () => console.log('Complite', this.menCollection)
    );
    this.subscription.add(sub);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
