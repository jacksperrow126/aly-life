import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[alyScaleFull]',
})
export class ScaleFullDirective {
  constructor(private el: ElementRef) {}

  @HostListener('click') sacle() {
    this.el.nativeElement.style.color = 'red';
  }
}
