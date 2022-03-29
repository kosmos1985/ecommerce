import { Component, OnDestroy, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { Collection } from 'src/app/models/collection';
import { CollectionsService } from 'src/app/services/collections.service';

@Component({
  selector: 'app-collections',
  templateUrl: './collections.component.html',
  styleUrls: ['./collections.component.scss'],
})
export class CollectionsComponent implements OnInit, OnDestroy {
  collections: Collection[] = [];
  private subscription = new Subscription();
  isFetching = false;

  constructor(
    private http: CollectionsService,
    private translate: TranslateService
  ) {}

  ngOnInit(): void {
    this.fetchCollections();
  }

  private fetchCollections() {
    this.isFetching = true;
    const sub = this.http.getCollections().subscribe(
      (collections) => {
        this.isFetching = false;
        this.collections = collections;
      },
      (error) => console.error(error)
    );
    this.subscription.add(sub);
    this.translate.get(['collections.sex']).subscribe((translations) => {
      this.collections = Array.of(translations['collections.sex']);
    });
  }
 

  fetchSmallImg(): Collection[] {
    const image = this.collections.filter((path) => path.small_img);
    if (typeof image == 'undefined') {
      return [];
    }

    const path = image.map((small) =>
      Object.values(small.small_img).reverse().pop()
    );

    return path;
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
