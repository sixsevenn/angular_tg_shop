import { Component, Input } from '@angular/core';
import { IProduct } from '../../services/products.service';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [RouterLink, CommonModule],
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
              <div class="img_div">
                <img class="card-img" src="assets/image/yt_profil1.png" >
              </div>
            
              <div class="card-title"> {{ title }} <br> {{ size }}</div>

              <div class="btn-keeper">
                <a class="btn" href="#">Заказать</a>
              </div>

              <div class="price">{{ price }}</div> 
              <div class="weight">{{ weight }}</div>

            </div>
            <div class="card">
              <div class="img_div">
                <img class="card-img" src="assets/image/yt_profil1.png" >
              </div>
              <div class="card-title">Поке с курочкой (рис) и гречка<br> Средний</div>

              <div class="btn-keeper">
                <a class="btn" href="#">Заказать</a>
              </div>

              <div class="price"> {{ price }} + ₽</div> 
              <div class="weight">340 г</div>

            </div>
          </div>


        </body>
      
        </html>
    
  `
})


export class ProductListComponent {
  @Input() title: string;
  @Input() price: number;
  @Input() size: string;
  @Input() weight: string;




  @Input() products: IProduct[];

}
