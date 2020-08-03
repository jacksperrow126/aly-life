import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SettingPage } from './setting.page';
import { UserComponent } from './user/user.component';
import { PasswordComponent } from './password/password.component';

const routes: Routes = [
  {
    path: '',
    component: SettingPage
  },
  {
    path: 'user',
    component: UserComponent
  },
  {
    path: 'password',
    component: PasswordComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SettingPageRoutingModule { }
