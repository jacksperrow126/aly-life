import { Component, OnInit, Input } from '@angular/core';
import { NoteService } from '@core/services/note.service';
import { Note } from '@core/models/note.model';
import { DialogService } from '@core/services/dialog.service';
import { DialogData } from '@core/models/dialog-data.model';


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
  private notesContainer: any;
  private deleteBtn: any;
  public dataDelete: DialogData;
  public editBtn: any;
  constructor(private noteService: NoteService) { }

  ngOnInit() {
    this.date = new Date(this.note.date);
    this.day = this.date.getDate();
    this.month = this.date.getMonth() + 1;
    this.dataDelete = {
      type: 'confirm',
      data: this.note.id
    }
  }

  letTest() {
    if (this.notesContainer == undefined) {
      this.notesContainer = document.querySelectorAll('.note-detail-container');
      this.deleteBtn = document.querySelectorAll('.delete');
      this.editBtn = document.querySelectorAll('.edit')
    };

    this.notesContainer.forEach((note: HTMLElement) => {
      note.classList.add('shake');
    });
    this.deleteBtn.forEach((del: HTMLElement) => {
      del.classList.remove('hide');
    });
    this.editBtn.forEach((del: HTMLElement) => {
      del.classList.remove('hide');
    });
    this.noteService.noteOnPress.next({ notes: this.notesContainer, delete: this.deleteBtn, edit: this.editBtn });
  }

}
