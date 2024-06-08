import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BasketProductService {
  private apiUrl = 'http://localhost:5000/api/basketProduct';

  constructor(private http: HttpClient) {}

  addToBasket( tgUserId: string, productId, quantity=1): Observable<any> {
    const body = { tgUserId, productId, quantity};
    return this.http.post(this.apiUrl, body);
  }

  removeFromBasket(tgUserId: string, productId, quantity=1, delete_all=false): Observable<any> {
    const body = { tgUserId, productId, quantity, delete_all };
    return this.http.post(`${this.apiUrl}/removeProduct`, body);
  }

  getBasketProducts(id: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/with_products?tgUserId=${id}`);
  }

}
