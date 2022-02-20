import { Component, OnInit } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Storage } from '@ionic/storage';
import { User } from '@core/models/user/user.model';
import { Router } from '@angular/router';
import { UserService } from '@core/services/user.service';
@Component({
  selector: 'aly-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private store: Storage,
    private router: Router,
    private userService: UserService
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  ngOnInit() {
    this.store.ready().then(() => {
      this.store.get('user').then((data: User) => {
        if (data == null) {
          this.router.navigateByUrl('/auth');
        } else {
          this.userService.user = data;
          if (this.userService.user.password !== undefined) {
            this.router.navigateByUrl('/auth');
          } else {
            this.router.navigateByUrl('/home');
          }
          return;
        }
      });
    });
  }
}
