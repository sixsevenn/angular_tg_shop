import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BasketService {
  private apiUrl = 'http://localhost:5000/api/basket';

  constructor(private http: HttpClient) {}

  getTotalPrice(tgUserId: string): Observable<{ totalPrice: number }> {
    return this.http.get<{ totalPrice: number }>(`${this.apiUrl}/getTotalPrice?tgUserId=${tgUserId}`);
  }

}
