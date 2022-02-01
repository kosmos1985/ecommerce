import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, Subject } from 'rxjs';
import { tap, map, filter, toArray, take, shareReplay } from 'rxjs/operators';
import { Collection } from '../models/collection';

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
  }

  // CartItemsConvertType(): Observable<{item: Collection; amount: number}[]>{
  //   const object = this.http.get<{item: Collection; amount: number}[]>(this.BASE_URL);
  // return  object;
  // }

// Object.value(object)

  //  getCartItems(id:number): Observable<{item: Collection, amount: number}[]>{
  //    this.cartItems = this.http.get<{item: Collection; amount: number}[]>(this.BASE_URL + id)
  //   return this.cartItems;
  // };

 

}
