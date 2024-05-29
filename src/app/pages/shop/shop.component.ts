import { Component, inject, OnInit } from '@angular/core';
import { TelegramService } from '../../services/telegram.service';
import { ProductService, IProduct } from '../../services/products.service';
import { UsersService } from '../../services/users.service'; 
import { ProductListComponent } from '../../components/product-list/product-list.component';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';




@Component({
  selector: 'app-shop',
  standalone: true,
  imports: [ProductListComponent,CommonModule, RouterLink],
  template: `
    
    <ng-container *ngFor="let productChunk of chunk(products, 2)">
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
    </ng-container>
  `,
})
export class ShopComponent implements OnInit {
  telegram = inject(TelegramService);
  products: IProduct[] = [];
  userData: any;

  constructor(public productService: ProductService, private usersService: UsersService) {
    this.telegram.BackButton.hide();
  }

  ngOnInit(): void {
    this.productService.getProducts().subscribe((products) => {
      this.products = products;
    });

    this.telegram.MainButton.setText('Посмотреть заказ');
    this.telegram.MainButton.show();

    this.userData = this.telegram.getData();

    if (this.userData) {
      this.authenticateUser(this.userData.id, this.userData.first_name, this.userData.last_name, this.userData.username, this.userData.language_code);
    }
  }



  chunk(arr, size) {
    let result = [];
    for (let i = 0; i < arr.length; i += size) {
      result.push(arr.slice(i, i + size));
    }
    return result;
  }


  authenticateUser(id: string, first_name: string, last_name: string, username: string, language_code: string) {
    const userData = {
      tg_user_id: id,
      first_name: first_name,
      last_name: last_name,
      username: username,
      language: language_code
    };

    this.usersService.authentication(userData).subscribe(
      response => {
        console.log('User authenticated successfully', response);
      },
      error => {
        console.error('Authentication failed', error);
      }
    );
  }



}
