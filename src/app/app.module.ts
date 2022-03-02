import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AgmCoreModule } from '@agm/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { IvyGalleryModule } from 'angular-gallery';

import { AppRoutingModule } from './app-routing.module';
import { MatIconModule } from '@angular/material/icon';
import { MatBadgeModule } from '@angular/material/badge';
import { MatCardModule} from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { LayoutModule } from '@angular/cdk/layout';

import { AppComponent } from './app.component';
import { NavComponent } from './components/nav/nav/nav.component';
import { CollectionsComponent } from './components/content/collections/collections.component';
import { MenComponent } from './components/content/men/men.component';

import { WomenComponent } from './components/content/women/women.component';
import { AboutComponent } from './components/content/about/about.component';
import { ContactComponent } from './components/content/contact/contact.component';

import { PageNotFoundComponent } from './components/content/page-not-found/page-not-found.component';
import { CartItemComponent } from './components/content/cart-item/cart-item.component';
import { ShoesToBuyComponent } from './components/content/shoes-to-buy/shoes-to-buy.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthInterceptorService } from './auth-interceptor.service';




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
    CartItemComponent,
    ShoesToBuyComponent,
  ],
  imports: [
    BrowserModule,
      AgmCoreModule.forRoot({
  apiKey: 'AIzaSyBlfYV2V0c5mjMltRS9iZb71M6Z-qGVaIo'
}),
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule,
    IvyGalleryModule,
    MatCardModule,
    MatIconModule,
    MatBadgeModule,
    MatButtonModule,
    MatMenuModule,
    MatProgressSpinnerModule,
    LayoutModule,
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass:AuthInterceptorService,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }

