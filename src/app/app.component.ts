import { Component } from '@angular/core';
import {Gallery} from 'angular-gallery'

export interface Tile {
  color: string;
  cols: number;
  rows: number;
  text: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  tiles: Tile[] = [
    {text: 'One', cols: 3, rows: 1, color: 'lightblue'},
    {text: 'Two', cols: 1, rows: 2, color: 'lightgreen'},
    {text: 'Three', cols: 1, rows: 1, color: 'lightpink'},
    {text: 'Four', cols: 2, rows: 1, color: '#DDBDF1'},
  ];
  index: number = 0;

  constructor(private gallery: Gallery) {}

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
}

}
