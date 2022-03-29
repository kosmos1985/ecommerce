import { Component, OnDestroy, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { About } from 'src/app/models/about';
import { Map } from 'src/app/models/map';
import { CollectionsService } from 'src/app/services/collections.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
})
export class AboutComponent implements OnInit, OnDestroy {
  about!: About;
  map!: Map;

  private subscription = new Subscription();

  constructor(
    private http: CollectionsService,
    private translate: TranslateService
  ) {}

  ngOnInit(): void {
    const subAbout = this.http.getAbout().subscribe(
      (aboutParams) => {
        this.about = aboutParams;
      },
      (error) => console.error(error)
    );

    const subMap = this.http.getMap().subscribe(
      (mapParams) => {
        this.map = mapParams;
      },
      (error) => console.error(error)
    );

    this.subscription.add(subAbout);
    this.subscription.add(subMap);
    this.translate
      .get(['about.description', 'map.title'])
      .subscribe((translations) => {
        this.about = translations['about.desctription'];
        this.map = translations['map.title'];
      });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
