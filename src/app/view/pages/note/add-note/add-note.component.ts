import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { NoteService } from '@core/services/note.service';
import { Note } from '@core/models/note.model';

@Component({
  selector: 'aly-add-note',
  templateUrl: './add-note.component.html',
  styleUrls: ['./add-note.component.scss'],
})
export class AddNoteComponent implements OnInit {

  allNot: Note[] = [];
  tags: string[];
  constructor(private noteService: NoteService) { }

  ngOnInit() {

  }

  addNote(formNote: FormControl) {
    if (formNote.value.content === '' || undefined) return;
    if (formNote.value.title === '' || undefined) formNote.value.title = 'Không Đề';
    var ID = function () {
      return '_' + Math.random().toString(36).substr(2, 9);
    };
    formNote.value.id = ID();
    console.log(formNote.value);

  }

}
