import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class GeoService {
  private url = environment.urlConf;

  constructor(private http: HttpClient) { }

  get():Observable<any>{
    return this.http.get(this.url+'/geocodes');
  }
}
