import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MoneyPage } from './money.page';
import { AddWalletComponent } from './money-manage/add-wallet/add-wallet.component';
import { AddMoneyComponent } from './add-money/add-money.component';

const routes: Routes = [
  {
    path: '',
    component: MoneyPage
  },
  {
    path: 'add-wallet',
    component: AddWalletComponent
  },
  {
    path: 'add-money',
    component: AddMoneyComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MoneyPageRoutingModule { }
