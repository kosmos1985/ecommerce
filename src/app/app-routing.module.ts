import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartItemComponent } from './components/cart-item/cart-item.component';
import { AboutComponent } from './components/content/about/about.component';
import { CollectionsComponent } from './components/content/collections/collections.component';
import { ContactComponent } from './components/content/contact/contact.component';

import { MenComponent } from './components/content/men/men.component';
import { PageNotFoundComponent } from './components/content/page-not-found/page-not-found.component';
import { ShoesToBuyComponent } from './components/content/shoes-to-buy/shoes-to-buy.component';

import { WomenComponent } from './components/content/women/women.component';

const routes: Routes = [

  { path: 'collections', component: CollectionsComponent },
  { path: 'not-found', component: PageNotFoundComponent },
  { path: 'mens', component: MenComponent },
  { path: 'men/:id', component: ShoesToBuyComponent },
  { path: 'womens', component: WomenComponent },
  { path: 'women/:id', component: ShoesToBuyComponent },
  { path: 'about', component: AboutComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'cartItem', component: CartItemComponent },
  { path: '', redirectTo: 'collections', pathMatch: 'full'},
  { path: '**', redirectTo: 'not-found', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
