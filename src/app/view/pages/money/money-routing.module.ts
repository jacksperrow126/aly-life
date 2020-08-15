import { MoneyPlanContainerComponent } from './money-plan-container/money-plan-container.component';
import { MoneyOverviewComponent } from './money-overview/money-overview.component';
import { MoneyHistoryComponent } from './money-history/money-history.component';
import { MoneyManageComponent } from './money-manage/money-manage.component';
import { AddMoneyPlanComponent } from './money-manage/add-money-plan/add-money-plan.component';
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
  },
  {
    path: 'add-plan',
    component: AddMoneyPlanComponent
  },
  {
    path: 'manage',
    component: MoneyManageComponent
  },
  {
    path: 'history',
    component: MoneyHistoryComponent
  },
  {
    path: 'chart',
    component: MoneyOverviewComponent
  },
  {
    path: 'plan',
    component: MoneyPlanContainerComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MoneyPageRoutingModule { }
