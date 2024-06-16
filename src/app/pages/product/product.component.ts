import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { IProduct, ProductService } from '../../services/products.service';
import { TelegramService } from '../../services/telegram.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule, Location } from '@angular/common';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="centered" *ngIf="product">
      <h2 class="mb">{{ product.name }}</h2>
      <br/>
      <img class="product-img" [src]="'http://localhost:5000/' + product.img" [alt]="product.name" />
      <p>{{ product.description }}</p>
      <p class="title-nut-val">Пищевая ценность</p>
      <p>{{ product.nutritional_value }}</p>
    </div>
  `,
})
export class ProductComponent implements OnInit, OnDestroy {
  product: IProduct | null = null;
  telegram = inject(TelegramService);
  productService = inject(ProductService);
  route = inject(ActivatedRoute);
  router = inject(Router);

  constructor(private location: Location) {
    this.goBack = this.goBack.bind(this);
  }

  goBack(): void {
    this.location.back();
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.productService.getProductById(Number(id)).subscribe((product) => {
        this.product = product;
      });
    }

    this.telegram.BackButton.show();
    this.telegram.BackButton.onClick(this.goBack);
  }

  ngOnDestroy(): void {
    this.telegram.BackButton.offClick(this.goBack);
  }
}

export default ProductComponent;