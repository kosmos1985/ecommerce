import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { About } from '../models/about';
import { Collection } from '../models/collection';
import { Map } from '../models/map';

@Injectable({
  providedIn: 'root'
})
export class CollectionsService {
  

  

  BASE_URL = 'http://localhost:3000/collections/';


  constructor(private http: HttpClient) { }
 
  getCollections() {
    return  this.http.get<Collection>(this.BASE_URL).pipe(map(arr => arr.sort((a: Collection, b: Collection) => a.company === b.company ? 0 : a.company ? 1 : -1)));
  };

  getMenCollection(){
    return this.http.get<Collection>(this.BASE_URL).pipe(map(items => items.filter(item => item.sex === "Men")));
  };

  getWomenCollection(){
    return this.http.get<Collection>(this.BASE_URL).pipe(map(items => items.filter(item => item.sex === 'Women')));
  };

  getItem(id:number) {
    return this.http.get<Collection>(this.BASE_URL + id);
  };
  
  getAbout(){
    return this.http.get<About>(this.BASE_URL + 5);
  };

  getMap(){
    return this.http.get<Map>(this.BASE_URL + 6);
  };

}
