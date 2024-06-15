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
      <h2>Доставка и оплата</h2>
      <form [formGroup]="shippingPaymentForm" (ngSubmit)="goToOrderReview()">
        <div>
          <label for="address">Адрес доставки:</label>
          <input id="address" formControlName="address">
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
  `,
  styles: [`
    .shippingPayment {
      padding: 20px;
    }
    .shippingPayment h2 {
      margin-bottom: 20px;
    }
    .shippingPayment form {
      display: flex;
      flex-direction: column;
    }
    .shippingPayment form div {
      margin-bottom: 10px;
    }
    .shippingPayment label {
      margin-bottom: 5px;
    }
    .shippingPayment input,
    .shippingPayment select {
      padding: 5px;
      font-size: 16px;
    }
    .shippingPayment button {
      margin-top: 20px;
      padding: 10px;
      font-size: 16px;
    }
  `]
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
      paymentMethod: ['', Validators.required]
    });

    this.telegram.MainButton.onClick(this.goToOrderReview);
  }

  get address() {
    return this.shippingPaymentForm.get('address');
  }

  get paymentMethod() {
    return this.shippingPaymentForm.get('paymentMethod');
  }

  goToOrderReview(): void {
    if (this.shippingPaymentForm.valid) {
      const address = this.shippingPaymentForm.get('address')?.value;
      const paymentMethod = this.shippingPaymentForm.get('paymentMethod')?.value;

      // Сохраните данные и переходите к следующему шагу
      console.log('Address:', address);
      console.log('Payment Method:', paymentMethod);

      this.router.navigate(['/order-review']);
    } else {
      console.log('Form is invalid');
    }
  }
}
