import { Injectable } from '@angular/core';
import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router';
import { Collection } from './models/collection';
import { CollectionsService } from './services/collections.service';



@Injectable({ providedIn: 'root' })
export class CollectionsResolverService implements Resolve<Collection[]> {
  constructor(
    private collectionsService: CollectionsService,
  ) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
   return this.collectionsService.getCollections();
  }
}