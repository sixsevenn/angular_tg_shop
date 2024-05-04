import { Component, inject } from '@angular/core';
import { TelegramService } from '../../services/telegram.service';
import { ProductsSevice } from '../../services/products.service';
import { ProductListComponent } from '../../components/product-list/product-list.component';

@Component({
  selector: 'app-shop',
  standalone: true,
  imports: [ProductListComponent],
  template: `
    <html lag="en">
    <head>
      <meta charset="UTF-8">
      <link rel="stylesheet" href="D:\Code_projects\Vscode\TG_shop\angular_tg_shop\src\styles.css">
      
      <link rel="preconnect" href="https://fonts.googleapis.com">
      <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
      <link href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap" rel="stylesheet">
      <title>Товар</title>
    </head>
    
    <body>
      <div class="wrapper">
        <div class="card">
          <img class="card-img" src="assets/image/boul-s-kur.jpeg" >
          <div class="card-title">Поке с курочкой (рис) Средний</div>
        </div>
      </div>
    </body>


    </html>
    
  `,
})
export class ShopComponent {
  telegram = inject(TelegramService);
  products = inject(ProductsSevice);

  constructor() {
    this.telegram.BackButton.hide();
  }
}
