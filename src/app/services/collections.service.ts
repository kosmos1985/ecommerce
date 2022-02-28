import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { About } from '../models/about';
import { Collection } from '../models/collection';
import { Contact } from '../models/contact';
import { Map } from '../models/map';

const BASE_URL = 'https://ecommerce-e18b8-default-rtdb.europe-west1.firebasedatabase.app/';

const ACCESS = 'Access-Control-Allow-Origin';

const headers = new HttpHeaders().append(ACCESS, 'http://localhost:4200');



@Injectable({
  providedIn: 'root'
})
export class CollectionsService {
  
 


  constructor(private http: HttpClient) { }
 
  getCollections(): Observable<Collection[]>{
    return  this.http.get<Collection>(`${BASE_URL}`, {'headers':headers}).pipe(map(arr => arr.sort((a: Collection, b: Collection) => a.company === b.company ? 0 : a.company ? 1 : -1)));
  };

  getMenCollection(): Observable<Collection[]>{
    return this.http.get<Collection>(`${BASE_URL}`, {'headers':headers}).pipe(map(items => items.filter(item => item.sex === "Men")));
  };

  getWomenCollection(): Observable<Collection[]>{
    return this.http.get<Collection>(`${BASE_URL}`, {'headers':headers}).pipe(map(items => items.filter(item => item.sex === 'Women')));
  };

  getItem(id:number): Observable<Collection> {
    return this.http.get<Collection>(`${BASE_URL}` + id, {'headers':headers});
  };
  
  getAbout(): Observable<About>{
    return this.http.get<About>(`${BASE_URL}` + 5, {'headers':headers});
  };

  getMap(): Observable<Map>{
    return this.http.get<Map>(`${BASE_URL}` + 6, {'headers':headers});
  };

  putContactData(contactData: Contact): Observable<Contact>{
    return this.http.put<Contact>(`${BASE_URL}` + '/' +  contactData.id, contactData, {'headers':headers});
  };

}
