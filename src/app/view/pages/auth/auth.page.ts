import { Component, OnInit } from '@angular/core';
import { UserService } from '@core/services/user.service';
import { User } from '@core/models/user/user.model';
import { FormControl } from '@angular/forms';
import { ImagePicker } from '@ionic-native/image-picker/ngx';
import { WebView } from '@ionic-native/ionic-webview/ngx';
import { Storage } from '@ionic/storage';
import { Router } from '@angular/router';

@Component({
  selector: 'aly-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss'],
})
export class AuthPage implements OnInit {

  public user: User;
  public url: any;
  public isErr = false;
  constructor(private userService: UserService, private imagePicker: ImagePicker, private webview: WebView, private store: Storage, private router: Router) { }

  
  ngOnInit() {
    this.url = 'assets/img/default-avatar.jpg';
    this.store.ready().then(() => {
      this.store.get('user').then(data => {
        if (data !== null || undefined) {
          this.user = data;
        } else {
          this.user = {
            name: undefined,
            avatar: this.url
          };
        }
      });
    });
  }

  onSubmit(auth: FormControl) {
    if (this.user.password !== undefined || null || '') {
      if (auth.value.pass == undefined || '' || auth.value.pass !== this.user.password) {
        this.isErr = true;
        return;
      }
      if (auth.value.pass == this.user.password) {
        setTimeout(() => {
          this.router.navigateByUrl('/home');
        }, 100);
      }
    } else {
      if (auth.value.name == undefined || '') {
        this.isErr = true;
        return;
      }
      this.isErr = false;
      this.user.name = auth.value.name;
      this.user.avatar = this.url;
      this.userService.saveUser(this.user);
      setTimeout(() => {
        this.router.navigateByUrl('/home');
      }, 200);
    }
  }

  picker() {
    this.imagePicker.getPictures({ maximumImagesCount: 1 }).then((results) => {
      for (var i = 0; i < results.length; i++) {
        this.url = this.webview.convertFileSrc(results[i]);
        this.user.avatar = this.url;
      }
    }, (err) => { });
  }
}

