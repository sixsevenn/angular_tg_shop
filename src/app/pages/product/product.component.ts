import { Component, OnDestroy, OnInit } from '@angular/core';
import { IProduct, ProductsSevice } from '../../services/products.service';
import { TelegramService } from '../../services/telegram.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [],
  template: `
    <div class="centered">
      <h2 class="mb">{{ product.title }}</h2>
      <br/>
      <img class="product-img" src="assets/image/yt_profil1.png" [alt]="product.title" />

      <p>{{ product.description }}</p>
      <p class="title-nut-val">Пищевая ценность</p>
      <p>{{ product.nutritional_value }}</p>
    </div>
  
  `,
})
export class ProductComponent implements OnInit, OnDestroy {
  product: IProduct;

  constructor (
    private products: ProductsSevice, 
    private telegram: TelegramService,
    private route: ActivatedRoute,
    private router: Router 
  ) {
    const id = this.route.snapshot.paramMap.get('id');
    this.product = this.products.getById(id);
    this.goBack = this.goBack.bind(this);
  }

  goBack() {
    this.router.navigate(['/']);
  }

  ngOnInit(): void {
    this.telegram.BackButton.show();
    this.telegram.BackButton.onClick(this.goBack);
  }

  ngOnDestroy(): void {
    this.telegram.BackButton.offClick(this.goBack);
  }
  

}
