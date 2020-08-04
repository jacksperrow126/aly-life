import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[alyChangePlan]'
})
export class ChangePlanDirective {
  constructor(private el: ElementRef) { }

  @HostListener('click') goBig() {
   
  }

}
