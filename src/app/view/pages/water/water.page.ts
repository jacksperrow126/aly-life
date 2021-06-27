import { Component, OnInit } from '@angular/core';
import { LocalNotifications } from '@ionic-native/local-notifications/ngx';

@Component({
  selector: 'aly-water',
  templateUrl: './water.page.html',
  styleUrls: ['./water.page.scss'],
})
export class WaterPage implements OnInit {
  times = [
    { id: 1, timeDrinkWater: '06:30', status: false },
    { id: 2, timeDrinkWater: '08:00', status: false },
    { id: 3, timeDrinkWater: '09:30', status: false },
    { id: 4, timeDrinkWater: '11:00', status: false },
    { id: 5, timeDrinkWater: '12:30', status: false },
    { id: 6, timeDrinkWater: '14:00', status: false },
    { id: 7, timeDrinkWater: '15:30', status: false },
    { id: 8, timeDrinkWater: '17:00', status: false },
    { id: 9, timeDrinkWater: '18:30', status: false },
    { id: 10, timeDrinkWater: '20:00', status: false },
    { id: 11, timeDrinkWater: '21:30', status: false },
    { id: 12, timeDrinkWater: '23:00', status: false },
  ];
  constructor(private localNotifications: LocalNotifications) {}

  ngOnInit() {}

  onUserSetTimeDinkWater(setTime) {
    const x = this.times[setTime];
    x.status = !x.status;
    // Schedule delayed notification
    this.localNotifications.schedule({
      text: 'Delayed ILocalNotification',
      trigger: { at: new Date(new Date().getTime() + 3600) },
      led: 'FF0000',
      sound: null,
    });
  }

  // // Schedule delayed notification
  // this.localNotifications.schedule({
  //    text: 'Delayed ILocalNotification',
  //    trigger: {at: new Date(new Date().getTime() + 3600)},
  //    led: 'FF0000',
  //    sound: null
  // });
  // // Schedule a single notification
  // this.localNotifications.schedule({
  //   id: 1,
  //   text: "Single ILocalNotification",
  //   sound: "file://beep.caf",
  //   data: "hahaha",
  // });
}
