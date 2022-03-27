import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Collection } from 'src/app/models/collection';
import { CollectionsService } from 'src/app/services/collections.service';

@Component({
  selector: 'app-women',
  templateUrl: './women.component.html',
  styleUrls: ['./women.component.scss'],
})
export class WomenComponent implements OnInit, OnDestroy {
  womenCollection: Collection[] = [];

  private subscription = new Subscription();

  constructor(private http: CollectionsService) {}

  ngOnInit(): void {
    const sub = this.http.getWomenCollection().subscribe(
      (collection) => {
        this.womenCollection = collection;
      },
      (error) => console.error(error)
    );
    this.subscription.add(sub);
  }

  fetchSmallImg(): Collection[] {
    const image = this.womenCollection.filter((path) => path.small_img);

    if (typeof image == 'undefined') {
      return [];
    }

    const path = image.map((small) =>
      Object.values(small.small_img).reverse().pop()
    );

    return path;
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
