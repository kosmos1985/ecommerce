import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { About } from '../models/about';
import { Collection } from '../models/collection';
import { Contact } from '../models/contact';
import { Map } from '../models/map';

@Injectable({
  providedIn: 'root'
})
export class CollectionsService {
  
  BASE_URL = 'http://localhost:3000/collections/';


  constructor(private http: HttpClient) { }
 
  getCollections(): Observable<Collection[]>{
    return  this.http.get<Collection>(this.BASE_URL).pipe(map(arr => arr.sort((a: Collection, b: Collection) => a.company === b.company ? 0 : a.company ? 1 : -1)));
  };

  getMenCollection(): Observable<Collection[]>{
    return this.http.get<Collection>(this.BASE_URL).pipe(map(items => items.filter(item => item.sex === "Men")));
  };

  getWomenCollection(): Observable<Collection[]>{
    return this.http.get<Collection>(this.BASE_URL).pipe(map(items => items.filter(item => item.sex === 'Women')));
  };

  getItem(id:number): Observable<Collection> {
    return this.http.get<Collection>(this.BASE_URL + id);
  };
  
  getAbout(): Observable<About>{
    return this.http.get<About>(this.BASE_URL + 5);
  };

  getMap(): Observable<Map>{
    return this.http.get<Map>(this.BASE_URL + 6);
  };

  putContactData(contactData: Contact): Observable<Contact>{
    return this.http.put<Contact>(this.BASE_URL + '/' +  contactData.id, contactData);
  };

}
