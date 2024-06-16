import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { TelegramService } from '../../services/telegram.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-shippingPayment',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  template: `
    <div class="shippingPayment">
      <h2>Куда</h2>
      <form [formGroup]="shippingPaymentForm" (ngSubmit)="goToOrderReview()">
        <div>
          <label for="address">Адрес доставки:</label>
          <input id="address" formControlName="address">
        </div>
        <div>
          <label for="entrance">Подъезд:</label>
          <input id="entrance" formControlName="entrance">
        </div>
        <div>
          <label for="apartmentOffice">Кв/офис:</label>
          <input id="apartmentOffice" formControlName="apartmentOffice">
        </div>
        <div>
          <label for="floor">Этаж:</label>
          <input id="floor" formControlName="floor">
        </div>
        <div>
          <label for="intercomCode">Код домофона:</label>
          <input id="intercomCode" formControlName="intercomCode">
        </div>
        <div>
          <label for="courierComment">Комментарий курьеру:</label>
          <input id="courierComment" formControlName="courierComment">
        </div>
        <div>
          <label for="phoneNumber">Телефон получателя:</label>
          <input id="phoneNumber" formControlName="phoneNumber">
        </div>
        <div>
          <label for="paymentMethod">Способ оплаты:</label>
          <select id="paymentMethod" formControlName="paymentMethod">
            <option value="card">Карта</option>
            <option value="cash">Наличные</option>
          </select>
        </div>
        <button type="submit">Оформить заказ</button>
      </form>
    </div>
  `
})
export class ShippingPaymentComponent implements OnInit {
  shippingPaymentForm: FormGroup;

  constructor(private fb: FormBuilder, private router: Router, private telegram: TelegramService) {
    this.telegram.MainButton.setText('Оформить заказ');
    this.goToOrderReview = this.goToOrderReview.bind(this);
  }

  ngOnInit(): void {
    this.shippingPaymentForm = this.fb.group({
      address: ['', Validators.required],
      entrance: [''],
      apartmentOffice: [''],
      floor: [''],
      intercomCode: [''],
      courierComment: [''],
      phoneNumber: ['', Validators.required],
      paymentMethod: ['', Validators.required]
    });

    this.telegram.MainButton.onClick(this.goToOrderReview);
  }

  goToOrderReview(): void {
    if (this.shippingPaymentForm.valid) {
      const formValues = this.shippingPaymentForm.value;

      // Сохраните данные и переходите к следующему шагу
      console.log('Form Values:', formValues);

      this.router.navigate(['/order-review']);
    } else {
      console.log('Form is invalid');
    }
  }
}