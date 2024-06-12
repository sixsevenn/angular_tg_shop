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
            <span class="quantity-label">Кол-во: {{ b_product.quantity }}</span>
            <button class="remove-button">Удалить</button>
        </div>
        </div>
    </div>
  `
})
export class BasketComponent implements OnInit {
  basket_products: any[] = [];
  userData: any;
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
    }

    this.telegram.BackButton.show();
    this.telegram.BackButton.onClick(this.goBack);
  }

  loadBasketProducts(userId: string): void {
    this.BasketProductService.getBasketProducts(userId).subscribe((basket_products) => {
      this.basket_products = basket_products;
    });
  }

  ngOnDestroy(): void {
    this.telegram.BackButton.offClick(this.goBack);
  }
}


export default BasketComponent;
