import { Component, OnInit, Input } from '@angular/core';
import { NoteService } from '@core/services/note.service';
import { Note } from '@core/models/note.model';


@Component({
  selector: 'aly-note-detail',
  templateUrl: './note-detail.component.html',
  styleUrls: ['./note-detail.component.scss'],
})
export class NoteDetailComponent implements OnInit {

  @Input('note') note: Note;
  public date: Date;
  public day: number;
  public month: number;
  constructor(private noteService: NoteService) { }

  ngOnInit() {
    this.date = new Date(this.note.date);
    this.day = this.date.getDate();
    this.month = this.date.getMonth();
  }

  letTest(e){
    console.log(e);
    
  }

}
