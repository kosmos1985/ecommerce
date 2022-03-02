import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { About } from '../models/about';
import { Collection } from '../models/collection';
import { Contact } from '../models/contact';
import { Map } from '../models/map';


const httpOptions = {
	headers: new HttpHeaders({
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': '*',
    'Content-Type': 'application/json',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, ',
    'Access-Control-Allow-Credentials': 'true',
	})
}

@Injectable({
  providedIn: 'root'
})
export class CollectionsService {
  
 

  constructor(private http: HttpClient) { }
 
  getCollections(): Observable<Collection[]>{
    return  this.http.get<Collection>(`${environment.apiUrl}`, httpOptions).pipe(map(array => array.sort((a: Collection, b: Collection) => a.company === b.company ? 0 : a.company ? 1 : -1)));
  };

  getMenCollection(): Observable<Collection[]>{
    return this.http.get<Collection>(`${environment.apiUrl}`, httpOptions).pipe(map(items => items.filter(item => item.sex === "Men")));
  };

  getWomenCollection(): Observable<Collection[]>{
    return this.http.get<Collection>(`${environment.apiUrl}`, httpOptions).pipe(map(items => items.filter(item => item.sex === 'Women')));
  };

  getItem(id:number): Observable<Collection> {
    return this.http.get<Collection>(`${environment.apiUrl}` , httpOptions);
  };
  
  getAbout(): Observable<About>{
    return this.http.get<About>(`${environment.apiUrl}`, httpOptions);
  };

  getMap(): Observable<Map>{
    return this.http.get<Map>(`${environment.apiUrl}`, httpOptions);
  };

  putContactData(contactData: Contact): Observable<Contact>{
    return this.http.put<Contact>(`${environment.apiUrl}` + '/' +  contactData.id, contactData, httpOptions);
  };

}
