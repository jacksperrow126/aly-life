import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl } from '@angular/forms';
import { NoteService } from '@core/services/note.service';
import { Note } from '@core/models/note/note.model';
import { Subscription } from 'rxjs';
import { randomID } from '@core/helper/random-id';
import { DialogData } from '@core/models/template/dialog-data.model';
import { Tag } from '@core/models/note/tag.model';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'aly-add-note',
  templateUrl: './add-note.component.html',
  styleUrls: ['./add-note.component.scss'],
})
export class AddNoteComponent implements OnInit, OnDestroy {
  public allNote: Note[] = [];
  public tags = new DialogData();
  public selectedTag: Tag;
  public remarkable = false;
  private subcription: Subscription;
  constructor(private noteService: NoteService, private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.subcription = this.noteService.tagOnSelect.subscribe((data: Tag) => {
      this.selectedTag = data;
    });
    this.getTags();
  }

  getTags(): void {
    this.tags.type = 'tags',
      this.tags.data = this.noteService.getTag();
  }

  addNote(formNote: FormControl): void {
    if (formNote.value.content === '' || undefined) return;
    if (formNote.value.title === '' || undefined) formNote.value.title = 'Không Đề';
    if (this.selectedTag === undefined) this.selectedTag = { type: 'common', text: 'Chung' };
    let ID = 'note_' + randomID();
    formNote.value.id = ID;
    let date = new Date();
    formNote.value.date = date;
    formNote.value.tag = this.selectedTag;
    formNote.value.remark = this.remarkable;
    this.noteService.saveNote(formNote.value);
    this._snackBar.open('Thành công rồi!', '', { duration: 1000, })
  }

  mark(): void {
    this.remarkable = !this.remarkable;
  }

  ngOnDestroy(): void {
    this.subcription.unsubscribe();
  }
}
