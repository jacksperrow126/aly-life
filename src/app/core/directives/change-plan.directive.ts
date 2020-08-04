import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[alyChangePlan]'
})
export class ChangePlanDirective {
  @Input() number
  constructor(private el: ElementRef) { }

  @HostListener('click') goBig() {
    this.number.value++
  }

}
