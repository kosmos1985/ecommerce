import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavComponent } from './nav/nav/nav.component';
import { CollectionsComponent } from './content/collections/collections.component';
import { MenComponent } from './content/men/men.component';

import { WomenComponent } from './content/women/women.component';
import { AboutComponent } from './content/about/about.component';
import { ContactComponent } from './content/contact/contact.component';
import { IvyGalleryModule } from 'angular-gallery';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    CollectionsComponent,
    MenComponent,
    WomenComponent,
    AboutComponent,
    ContactComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    IvyGalleryModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
