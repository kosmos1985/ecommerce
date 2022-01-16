import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './components/content/about/about.component';
import { CollectionsComponent } from './components/content/collections/collections.component';
import { ContactComponent } from './components/content/contact/contact.component';
import { MenComponent } from './components/content/men/men.component';
import { PageNotFoundComponent } from './components/content/page-not-found/page-not-found.component';
import { WomenComponent } from './components/content/women/women.component';

const routes: Routes = [

  { path: 'collections', component: CollectionsComponent },
  { path: 'not-found', component: PageNotFoundComponent },
  { path: 'men', component: MenComponent },
  { path: 'women', component: WomenComponent },
  { path: 'about', component: AboutComponent },
  { path: 'contact', component: ContactComponent },
  { path: '', redirectTo: 'collections', pathMatch: 'full'},
  { path: '**', redirectTo: 'not-found', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
