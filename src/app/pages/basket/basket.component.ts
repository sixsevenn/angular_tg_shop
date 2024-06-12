import { Component, OnInit, inject} from '@angular/core';
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
      <div class="basket_card" *ngFor="let b_product of basket_products">
        <div class="basket_img_div">
          <img class="basket-card-img" [src]="'http://localhost:5000/' + b_product.product.img">
        </div>
        <div class="basket_info">
          <div class="basket-product-name">{{ b_product.product.name }}</div>
          <div class="basket-line-price-weight">
            <div class="basket-product-price">{{ b_product.product.price }} ₽</div>
            <div class="basket-product-weight">{{ b_product.product.weight }} г</div>
          </div>
        </div>
        <div class="basket_quantity">
          <img class="btn-icon-minus" src="assets/images/minus-30.png" (click)="decrementQuantity(b_product)">
          <div class="quantity-keeper">
            <span class="btn-text">{{ b_product.quantity }}</span>
          </div>
          <img class="btn-icon-plus" src="assets/images/plus-30.png" (click)="incrementQuantity(b_product)">
          <button class="remove-button" (click)="removeProduct(b_product.product.id, true)">Удалить</button>
        </div>
      </div>
    </div>
  `
})
export class BasketComponent implements OnInit {
  basket_products: any[] = [];
  userData: any;
  // testUserDataId: any;
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
        // this.loadBasketProducts("1040154933");

    }

    this.telegram.BackButton.show();
    this.telegram.BackButton.onClick(this.goBack);
  }

  loadBasketProducts(userId: string): void {
    this.BasketProductService.getBasketProducts(userId).subscribe((basket_products) => {
      this.basket_products = basket_products;
    });
  }


  incrementQuantity(b_product: any): void {
    console.log('userDataId: ')
    console.log('userDataId: ', this.userData.id)
    b_product.quantity++;
    this.BasketProductService.addToBasket(this.userData.id, b_product.product.id, b_product.quantity).subscribe(
      () => {
        console.log('Product quantity increased successfully');
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
      },
      error => {
        console.error('Failed to remove product', error);
      }
    );
  }
  

  ngOnDestroy(): void {
    this.telegram.BackButton.offClick(this.goBack);
  }
}


export default BasketComponent;
