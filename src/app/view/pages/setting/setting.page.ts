import { Component, OnInit } from '@angular/core';
import { ImagePicker } from '@ionic-native/image-picker/ngx';
import { WebView } from '@ionic-native/ionic-webview/ngx';
import { UserService } from '@core/services/user.service';
import { User } from '@core/models/user/user.model';
import { Crop } from '@ionic-native/crop/ngx';

@Component({
  selector: 'aly-setting',
  templateUrl: './setting.page.html',
  styleUrls: ['./setting.page.scss'],
})
export class SettingPage implements OnInit {

  public user: User;
  public url: any;
  constructor(private imagePicker: ImagePicker, private webview: WebView, private userService: UserService, private crop: Crop) { }

  ngOnInit() {
    this.user = this.userService.user
  }

  picker() {
    this.imagePicker.getPictures({ maximumImagesCount: 1 }).then((results) => {
      for (var i = 0; i < results.length; i++) {
        this.crop.crop(results[i], { quality: 75, targetHeight: 250, targetWidth: 250 })
          .then(
            newImage => {
              this.url = this.webview.convertFileSrc(newImage);
              this.userService.updateAvatar(this.url)
            },
            error => console.error('Error cropping image', error)
          );
      }
    }, (err) => { });
  }
}
