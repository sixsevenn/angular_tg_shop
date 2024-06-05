import { Component, inject, OnInit } from '@angular/core';
import { TelegramService } from '../../services/telegram.service';
import { ProductService, IProduct } from '../../services/products.service';
import { UsersService } from '../../services/users.service';
import { BasketProductService } from '../../services/basketProduct.service';
import { ProductListComponent } from '../../components/product-list/product-list.component';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-shop',
  standalone: true,
  imports: [ProductListComponent, CommonModule, RouterLink],
  template: `
    <ng-container *ngFor="let productChunk of chunk(products, 2)">
      <div class="wrapper">
        <div class="card" [routerLink]="'/product/' + product.id" *ngFor="let product of productChunk">
          <div class="img_div">
            <img class="card-img" [src]="'http://localhost:5000/' + product.img">
          </div>
          <div class="card-title">{{ product.name }}</div>

          <!-- кнопка и счетчик -->
          <div class="btn-keeper">
            <a class="btn" [attr.data-id]="product.id" *ngIf="!showQuantity[product.id]" (click)="handleClick($event)">
              <img class="btn-icon" [id]="product.id" src="assets/images/plus-30.png">
              <span class="btn-text" [id]="product.id">Добавить</span>
            </a>
            <a class="btn" *ngIf="showQuantity[product.id]">
              <img class="btn-icon-minus" src="assets/images/minus-30.png" (click)="decrementQuantity(product.id)">
              <div class="quantity-keeper">
                <span class="btn-text">{{ quantities[product.id] }}</span>
              </div>
              <img class="btn-icon-plus" src="assets/images/plus-30.png" (click)="incrementQuantity(product.id)">
            </a>
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
  quantities: { [productId: string]: number } = {};
  showQuantity: { [productId: string]: boolean } = {};

  constructor(
    public productService: ProductService, 
    private usersService: UsersService,
    private BasketProductService: BasketProductService
    ) {
    this.telegram.BackButton.hide();
  }

  ngOnInit(): void {
    this.productService.getProducts().subscribe((products) => {
      this.products = products;
      this.initializeQuantities(products);
    });

    this.telegram.MainButton.setText('Посмотреть заказ');
    this.telegram.MainButton.show();

    this.userData = this.telegram.getData();

    if (this.userData) {
      this.authenticateUser(this.userData.id, this.userData.first_name, this.userData.last_name, this.userData.username, this.userData.language_code);
    } else{
      console.log("Не произошла авторизация")
    }
    
  }

  initializeQuantities(products: IProduct[]): void {
    products.forEach(product => {
      this.quantities[product.id] = 0;
      this.showQuantity[product.id] = false;
    });
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

  handleClick(event: Event): void {
    const target = event.target as HTMLElement;
    const ProductId = target.getAttribute('data-id') || target.parentElement?.getAttribute('data-id');
    if (ProductId) {
      console.log("добавить в корзину: ", ProductId);
      this.add_to_basket_test(ProductId);
      
      this.quantities[ProductId]++;
      this.showQuantity[ProductId] = true;
    }
  }

  incrementQuantity(productId: string): void {
    this.quantities[productId]++;
    console.log("Добавить в корзину: ", productId)
    this.add_to_basket_test(productId);
  }

  decrementQuantity(productId: string): void {
    if (this.quantities[productId] > 0) {
      this.quantities[productId]--;
      console.log("Удалить из корзины: ", productId)
      this.delete_from_basket_test(productId);
    }
    if (this.quantities[productId] === 0) {
      this.showQuantity[productId] = false;
    }
  }



  add_to_basket(productId: string): void {
    if (this.userData && this.userData.id) {
      this.BasketProductService.addToBasket(this.userData.id, productId).subscribe(
        response => {
          console.log('Product added to basket successfully', response);
        },
        error => {
          console.error('Failed to add product to basket', error);
        }
      );
    } else {
      console.log("Отсутствует userData или userData.id")
    }
  }

  delete_from_basket(productId: string): void {
    if (this.userData && this.userData.id) {
      this.BasketProductService.removeFromBasket(this.userData.id, productId).subscribe(
        response => {
          console.log('Product deleted from basket successfully', response);
        },
        error => {
          console.error('Failed to delete product from basket', error);
        }
      );
    }else {
      console.log("Отсутствует userData или userData.id")
    }
  }

  add_to_basket_test(productId: string): void {
    this.BasketProductService.addToBasket("1040154933", productId).subscribe(
      response => {
        console.log('Product added to basket successfully', response);
      },
      error => {
        console.error('Failed to add product to basket', error);
      }
    );
  }

  delete_from_basket_test(productId: string): void {
    this.BasketProductService.removeFromBasket("1040154933", productId).subscribe(
      response => {
        console.log('Product deleted from basket successfully', response);
      },
      error => {
        console.error('Failed to delete product from basket', error);
      }
    );
  }
  
  
}
