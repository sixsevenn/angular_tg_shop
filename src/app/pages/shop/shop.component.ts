import { Component, inject, OnInit } from '@angular/core';
import { TelegramService } from '../../services/telegram.service';
import { ProductService, IProduct } from '../../services/products.service';
import { ProductListComponent } from '../../components/product-list/product-list.component';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';




@Component({
  selector: 'app-shop',
  standalone: true,
  imports: [ProductListComponent,CommonModule, RouterLink],
  template: `
      <div>
        <p>User ID: {{ userData.id }}</p>
        <p>First Name: {{ userData.first_name }}</p>
        <p>Last Name: {{ userData.last_name }}</p>
        <p>Username: {{ userData.username }}</p>
        <p>Language: {{ userData.language_code }}</p>
      </div>
    <!-- <ng-container *ngFor="let productChunk of chunk(products, 2)">
      <div class="wrapper">
        <div class="card" [routerLink]="'/product/' + product.id" *ngFor="let product of productChunk">
          <div class="img_div">
            <img class="card-img" [src]="'http://localhost:5000/' + product.img">
          </div>
          <div class="card-title">{{ product.name }}</div>
          <div class="btn-keeper">
            <a class="btn" href="https://t.me/sixxseven">Заказать</a>
          </div>
          <div class="price">{{ product.price }} ₽</div>
          <div class="weight">{{ product.weight }} г</div>
        </div>
      </div>
    </ng-container> -->
  `,
})
export class ShopComponent implements OnInit {
  telegram = inject(TelegramService);
  products: IProduct[] = [];
  userData: any;

  constructor(public productService: ProductService) {
    this.telegram.BackButton.hide();
  }

  ngOnInit(): void {
    this.productService.getProducts().subscribe((products) => {
      this.products = products;
    });

    this.telegram.MainButton.setText('Посмотреть заказ');
    this.telegram.MainButton.show();

    this.userData = this.telegram.getData();
  }

  chunk(arr, size) {
    let result = [];
    for (let i = 0; i < arr.length; i += size) {
      result.push(arr.slice(i, i + size));
    }
    return result;
  }
}
