import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[alyTouchReact]'
})
export class TouchReactDirective {

  constructor(private el: ElementRef) {
  }

  @HostListener('click') touch() {
    this.el.nativeElement.classList.add('on-press');
    setTimeout(() => {
      this.el.nativeElement.classList.remove('on-press');
    }, 500)
  }


}
