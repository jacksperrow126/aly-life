import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SettingPageRoutingModule } from './setting-routing.module';

import { SettingPage } from './setting.page';
import { SharedModule } from '@core/shared/shared/shared.module';
import { PasswordComponent } from './password/password.component';
import { UserComponent } from './user/user.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SettingPageRoutingModule,
    SharedModule
  ],
  declarations: [SettingPage, PasswordComponent, UserComponent]
})
export class SettingPageModule { }
