import { Component, inject, OnInit } from '@angular/core';
import { TelegramService } from '../../services/telegram.service';
import { ProductsSevice, IProduct } from '../../services/products.service';
import { ProductListComponent } from '../../components/product-list/product-list.component';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ProductService } from '../../services/ProductService';




@Component({
  selector: 'app-shop',
  standalone: true,
  imports: [ProductListComponent,CommonModule, RouterLink],
  template: `
    <ng-container *ngFor="let productChunk of chunk(products, 2)">
      <div class="wrapper">
        <div class="card" *ngFor="let product of productChunk">
          <div class="img_div">
            <img class="card-img" src="assets/image/yt_profil1.png">
          </div>
          <div class="card-title">{{ product.title }}<br>{{ product.size }}</div>
          <div class="btn-keeper">
            <a class="btn" [href]="product.link">Заказать</a>
          </div>
          <div class="price">{{ product.price }} ₽</div> 
          <div class="weight">{{ product.weight }} г</div>
        </div>
      </div>
    </ng-container>


  `,
})
export class ShopComponent implements OnInit {
  products: any[];

  constructor(private productService: ProductService, private telegram: TelegramService) { }

  ngOnInit(): void {
    this.getProducts();
    this.telegram.MainButton.setText('Посмотреть заказ');
    this.telegram.MainButton.show();
  }

  getProducts() {
    this.productService.getProducts().subscribe((data: any) => {
      this.products = data.product;
    });
  }
  
  chunk(arr, size) {
    let result = [];
    for (let i = 0; i < arr.length; i += size) {
      result.push(arr.slice(i, i + size));
    }
    return result;
  }

}