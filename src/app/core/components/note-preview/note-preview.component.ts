import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'aly-note-preview',
  templateUrl: './note-preview.component.html',
  styleUrls: ['./note-preview.component.scss'],
})
export class NotePreviewComponent implements OnInit {

  isRemarkable = false;
  arr = new Array(5)
  constructor() { }

  ngOnInit() {}

  remark(){
    this.isRemarkable = !this.isRemarkable
  }
}
