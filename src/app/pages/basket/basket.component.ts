import { Component, OnInit, inject } from '@angular/core';
import { BasketProductService } from '../../services/basketProduct.service';
import { TelegramService } from '../../services/telegram.service';
import { ShopComponent } from '../shop/shop.component';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-basket',
  standalone: true,
  imports: [CommonModule, ShopComponent],
  template: `
    <div class="basket">
      <div class="basket-title-keeper">
        <div class="basket-title">Заказ {{this.userData.id}}</div>
        <svg class="trash-bin-icon" xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 24 24" width="24px" height="24px" (click)="removeAllProducts()">
          <path d="M 10 2 L 9 3 L 5 3 C 4.4 3 4 3.4 4 4 C 4 4.6 4.4 5 5 5 L 7 5 L 17 5 L 19 5 C 19.6 5 20 4.6 20 4 C 20 3.4 19.6 3 19 3 L 15 3 L 14 2 L 10 2 z M 5 7 L 5 20 C 5 21.1 5.9 22 7 22 L 17 22 C 18.1 22 19 21.1 19 20 L 19 7 L 5 7 z M 9 9 C 9.6 9 10 9.4 10 10 L 10 19 C 10 19.6 9.6 20 9 20 C 8.4 20 8 19.6 8 19 L 8 10 C 8 9.4 8.4 9 9 9 z M 15 9 C 15.6 9 16 9.4 16 10 L 16 19 C 16 19.6 15.6 20 15 20 C 14.4 20 14 19.6 14 19 L 14 10 C 14 9.4 14.4 9 15 9 z"/>
        </svg>
      </div>

      <div class="basket_card" *ngFor="let b_product of basket_products">
        <div class="basket_img_div">
          <img class="basket-card-img" [src]="'http://localhost:5000/' + b_product.product.img">
        </div>
        <div class="basket_info">
          <div class="basket-product-name">{{ b_product.product.name }}</div>
          <div class="basket-line-price-weight">
            <div class="basket-product-price"> {{ b_product.product.price }} ₽ </div>
            <!-- <div> / </div> -->
            <div class="basket-product-weight"> {{ b_product.product.weight }} г </div>
          </div>
        </div>
        <div class="basket_quantity">
          <img class="btn-icon-minus" src="assets/images/minus-30.png" (click)="decrementQuantity(b_product)">
          <div class="quantity-keeper">
            <span class="btn-text">{{ b_product.quantity }}</span>
          </div>
          <img class="btn-icon-plus" src="assets/images/plus-30.png" (click)="incrementQuantity(b_product)">
          </div>
        <!-- <button class="remove-button" (click)="removeProduct(b_product.product.id, true)">Удалить</button> -->
      </div>
    </div>
  `
})
export class BasketComponent implements OnInit {
  basket_products: any[] = [];
  userData: any;
  testUserDataId: any;
  telegram = inject(TelegramService);
  route = inject(ActivatedRoute);
  router = inject(Router);

  constructor(private BasketProductService: BasketProductService) {
    this.goBack = this.goBack.bind(this);
  }

  goBack(): void {
    this.router.navigate(['/']).then(() => {
      window.location.reload();
    });
  }

  ngOnInit(): void {
    const savedUserData = localStorage.getItem('userData');
    if (savedUserData) {
        this.userData = JSON.parse(savedUserData);
        this.loadBasketProducts(this.userData.id);
    } else {
        console.log("UserData absent")
        // this.testUserDataId = "1040154933";
        // перед деплоем поменять все testUserId на this.userData.id
        // this.loadBasketProducts("1040154933");
    }

    this.telegram.BackButton.show();
    this.telegram.BackButton.onClick(this.goBack);

    this.telegram.MainButton.setText('Заказ');
    this.telegram.MainButton.show;
  }

  loadBasketProducts(userId: string): void {
    this.BasketProductService.getBasketProducts(userId).subscribe((basket_products) => {
      this.basket_products = basket_products;
      this.updateMainButton();
    });
  }

  updateMainButton(): void {
    const totalProducts = this.basket_products.reduce((acc, b_product) => acc + b_product.quantity, 0);
    if (totalProducts > 0) {
      this.telegram.MainButton.show();
    } else {
      this.telegram.MainButton.hide();
    }
  }

  incrementQuantity(b_product: any): void {
    b_product.quantity++;
    this.BasketProductService.addToBasket(this.userData.id, b_product.product.id).subscribe(
      () => {
        console.log('Product quantity increased successfully');
        this.updateMainButton();
      },
      error => {
        console.error('Failed to increase product quantity', error);
      }
    );
  }

  decrementQuantity(b_product: any): void {
    if (b_product.quantity > 1) {
      b_product.quantity--;
      this.BasketProductService.removeFromBasket(this.userData.id, b_product.product.id, 1).subscribe(
        () => {
          console.log('Product quantity decreased successfully');
          this.updateMainButton();
        },
        error => {
          console.error('Failed to decrease product quantity', error);
        }
      );
    } else {
      this.removeProduct(b_product.product.id, true);
    }
  }

  removeProduct(productId: string, delete_all: boolean = false): void {
    this.basket_products = this.basket_products.filter(b_product => b_product.product.id !== productId);
    this.BasketProductService.removeFromBasket(this.userData.id, productId, 1, delete_all).subscribe(
      () => {
        console.log('Product removed successfully');
        this.updateMainButton();
      },
      error => {
        console.error('Failed to remove product', error);
      }
    );
  }

  removeAllProducts(): void {
    this.BasketProductService.removeAllFromBasket(this.userData.id).subscribe(
      () => {
        this.basket_products = [];
        console.log('All products removed successfully');
        this.updateMainButton();
      },
      error => {
        console.error('Failed to remove all products', error);
      }
    );
  }

  ngOnDestroy(): void {
    this.telegram.BackButton.offClick(this.goBack);
  }
}

export default BasketComponent;
