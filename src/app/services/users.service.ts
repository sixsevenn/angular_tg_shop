import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
    providedIn: 'root'
  })
  export class UsersService {
  
    private apiUrl = 'http://localhost:5000/api/user/authentication';
  
    constructor(private http: HttpClient) {}
  
    authentication(userData: any): Observable<any> {
      return this.http.post(this.apiUrl, userData);
    }


    // checkAuth(): Observable<any> {
    //   return this.http.get(`${this.apiUrl}/users/auth`);
    // }
  }