import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MoneyPage } from './money.page';

const routes: Routes = [
  {
    path: '',
    component: MoneyPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MoneyPageRoutingModule {}
