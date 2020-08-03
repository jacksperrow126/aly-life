import { Directive, Input, HostListener } from '@angular/core';
import { Router } from '@angular/router';

@Directive({
  selector: '[alyRoute]'
})
export class RouteDirective {
  @Input() route: string;
  constructor(private router: Router) { }

  @HostListener('click') routeToPage() {
    setTimeout(() => {
      this.router.navigateByUrl(this.route)
    }, 100)
  }
}
