import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface IProduct {
  id: number;
  name: string;
  description: string;
  price: number;
  weight: number;
  img: string;
  nutritional_value: string;
  typeId: number;
  type: { id: number; name: string; }
}


// const domain = 'https://result.school';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = 'http://localhost:5000/api/product'; // Убедитесь, что URL соответствует вашему серверу

  constructor(private http: HttpClient) {}

  getProducts(): Observable<IProduct[]> {
    return this.http.get<IProduct[]>(this.apiUrl);
  }

  getProductById(id: number): Observable<IProduct> {
    return this.http.get<IProduct>(`${this.apiUrl}/${id}`);
  }
}