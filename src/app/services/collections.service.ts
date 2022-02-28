import { HttpClient, HttpHeaders } from '@angular/common/http';
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
		'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',  
    'Access-Control-Allow-Credentials': 'true',
    'Access-Control-Allow-Headers': 'content-type',
	})
}


@Injectable({
  providedIn: 'root'
})
export class CollectionsService {
  
 

  constructor(private http: HttpClient) { }
 
  getCollections(): Observable<Collection[]>{
    return  this.http.get<Collection>(`${environment.apiUrl}`, httpOptions).pipe(map(arr => arr.sort((a: Collection, b: Collection) => a.company === b.company ? 0 : a.company ? 1 : -1)));
  };

  getMenCollection(): Observable<Collection[]>{
    return this.http.get<Collection>(`${environment.apiUrl}`, httpOptions).pipe(map(items => items.filter(item => item.sex === "Men")));
  };

  getWomenCollection(): Observable<Collection[]>{
    return this.http.get<Collection>(`${environment.apiUrl}`, httpOptions).pipe(map(items => items.filter(item => item.sex === 'Women')));
  };

  getItem(id:number): Observable<Collection> {
    return this.http.get<Collection>(`${environment.apiUrl}` + id, httpOptions);
  };
  
  getAbout(): Observable<About>{
    return this.http.get<About>(`${environment.apiUrl}` + 5, httpOptions);
  };

  getMap(): Observable<Map>{
    return this.http.get<Map>(`${environment.apiUrl}` + 6, httpOptions);
  };

  putContactData(contactData: Contact): Observable<Contact>{
    return this.http.put<Contact>(`${environment.apiUrl}` + '/' +  contactData.id, contactData, httpOptions);
  };

}
