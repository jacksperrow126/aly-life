import { DialogService } from './../services/dialog.service';
import { Directive, Input, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[alyDialog]'
})
export class DialogDirective {
  @Input() data: any;
  constructor(private el: ElementRef, private dialogService: DialogService) { }

  @HostListener('click') show() {
    this.dialogService.showDialog(this.data);
  }

}
