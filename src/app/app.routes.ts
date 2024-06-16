import { Routes } from '@angular/router';
import { ShopComponent } from './pages/shop/shop.component';
import { FeedbackComponent } from './pages/feedback/feedback.component';
import { ProductComponent } from './pages/product/product.component';
// import { AdminComponent } from './pages/admin/admin.component';
import { BasketComponent } from './pages/basket/basket.component';
import { ShippingPaymentComponent } from './pages/shippingPayment/shippingPayment.component';

export const routes: Routes = [
    { path: '', component: ShopComponent, pathMatch: 'full', data: { animation: 'ShopPage' }},
    {path: 'feedback', component: FeedbackComponent},
    {path: 'product/:id', component: ProductComponent, data: { animation: 'ProductPage' }},
    // {path: 'admin', component: AdminComponent},
    {path: 'basket', component: BasketComponent},
    {path: 'shippingPayment', component: ShippingPaymentComponent},
];
