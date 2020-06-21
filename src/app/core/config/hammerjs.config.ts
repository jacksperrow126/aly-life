import { Injectable } from "@angular/core";
import { HammerGestureConfig } from "@angular/platform-browser";

@Injectable()
export class IonicGestureConfig extends HammerGestureConfig {
    overrides = {
        'press': { time: 250 },  // default: 251 ms
        'pinch': { enable: false },
        'rotate': { enable: false },
    };
}