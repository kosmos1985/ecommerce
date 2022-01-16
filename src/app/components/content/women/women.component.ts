import { Component, OnInit } from '@angular/core';
import {Gallery} from 'angular-gallery'

@Component({
  selector: 'app-women',
  templateUrl: './women.component.html',
  styleUrls: ['./women.component.scss']
})
export class WomenComponent implements OnInit {
  
  index: number = 0;

  constructor(private gallery: Gallery) { }

  ngOnInit(): void {
  }

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