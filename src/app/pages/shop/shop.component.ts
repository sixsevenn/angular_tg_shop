import { Component, inject } from '@angular/core';
import { TelegramService } from '../../services/telegram.service';
import { ProductsSevice, IProduct } from '../../services/products.service';
import { ProductListComponent } from '../../components/product-list/product-list.component';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';




@Component({
  selector: 'app-shop',
  standalone: true,
  imports: [ProductListComponent,CommonModule, RouterLink],
  template: `
    <ng-container *ngFor="let productChunk of chunk(productsService.products, 2)">
      <div class="wrapper">
        <div class="card" [routerLink]="'/product/' + product.id" *ngFor="let product of productChunk">
          <div class="img_div">
            <img class="card-img" src="assets/image/yt_profil1.png">
          </div>
          <div class="card-title">{{ product.title }}<br>{{ product.size }}</div>
          <div class="btn-keeper">
            <a class="btn" href="https://t.me/sixxseven">Заказать</a>
          </div>
          <div class="price">{{ product.price }} ₽</div> 
          <div class="weight">{{ product.weight }} г</div>
        </div>
      </div>
    </ng-container>


  `,
})
export class ShopComponent {
  telegram = inject(TelegramService);
  // products = inject(ProductsSevice);
  



  constructor(public productsService: ProductsSevice) {
    this.telegram.BackButton.hide();
  }

  ngOnInit(): void {
    this.telegram.MainButton.setText('Посмотреть заказ');
    this.telegram.MainButton.show();
  }

  chunk(arr, size) {
    let result = [];
    for (let i = 0; i < arr.length; i += size) {
      result.push(arr.slice(i, i + size));
    }
    return result;
  }
  
  
}
