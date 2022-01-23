import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { IvyGalleryModule } from 'angular-gallery';

import { AppRoutingModule } from './app-routing.module';
import { MatIconModule } from '@angular/material/icon';
import { MatBadgeModule } from '@angular/material/badge';

import { AppComponent } from './app.component';
import { NavComponent } from './components/nav/nav/nav.component';
import { CollectionsComponent } from './components/content/collections/collections.component';
import { MenComponent } from './components/content/men/men.component';

import { WomenComponent } from './components/content/women/women.component';
import { AboutComponent } from './components/content/about/about.component';
import { ContactComponent } from './components/content/contact/contact.component';

import { PageNotFoundComponent } from './components/content/page-not-found/page-not-found.component';
import { CartComponent } from './components/cart/cart.component';
import { CartItemComponent } from './components/cart-item/cart-item.component';
import { MenShoesToBuyComponent } from './components/content/men/men-shoes-to-buy/men-shoes-to-buy.component';
import { WomenShoesToBuyComponent } from './components/content/women/women-shoes-to-buy/women-shoes-to-buy.component';



@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    CollectionsComponent,
    MenComponent,
    WomenComponent,
    AboutComponent,
    ContactComponent,
    PageNotFoundComponent,
    CartComponent,
    CartItemComponent,
    MenShoesToBuyComponent,
    WomenShoesToBuyComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    IvyGalleryModule,
    MatIconModule,
    MatBadgeModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
