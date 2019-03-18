import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  constructor(public http: HttpClient) { }

  //http call to fetch local json data
  fetchData(url){
    return this.http.get(url);
  }
}
