import { Directive, ElementRef, Input, OnInit, } from '@angular/core';
import { NoteBackground } from '@core/helper/note-background';

@Directive({
  selector: '[alyNoteBackground]'
})
export class NoteBackgroundDirective implements OnInit {
  @Input() tag: any;
  private noteBackground = NoteBackground;
  constructor(private el: ElementRef) { }

  ngOnInit() {
    this.el.nativeElement.style.background = `url(${this.noteBackground[this.tag].background}) no-repeat center`;
    this.el.nativeElement.style.backgroundSize = 'cover'
  }

}
