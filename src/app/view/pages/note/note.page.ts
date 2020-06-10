import { Component, OnInit, OnDestroy } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Subscription } from 'rxjs';
import { NoteService } from '@core/services/note.service';
import { Note } from '@core/models/note.model';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
@Component({
  selector: 'aly-note',
  templateUrl: './note.page.html',
  styleUrls: ['./note.page.scss'],
})
export class NotePage implements OnInit, OnDestroy {
  public notesTemplate: Note[];
  public notes: Note[];
  private subcription: Subscription;
  public totalNotes: number;
  public moment = new Date();
  constructor(private storage: Storage, private noteService: NoteService) { }

  ngOnInit() {
    this.storage.get('note').then((data: Note[]) => {
      this.notesTemplate = data;
      this.notes = data;
    });
    this.subcription = this.noteService.newNote.subscribe(() => {
      this.storage.get('note').then((data: Note[]) => {
        this.notesTemplate = data;
        this.notes = data;
      });
    })
  }

  pickDate(event: MatDatepickerInputEvent<Date>) {
    let date = event.value;
    this.notes = this.notesTemplate.filter(note => {
      let noteDate = new Date(note.date);
      return noteDate.getDate() == date.getDate();
    })
  }

  showAll() {
    this.notes = this.notesTemplate;
  }

  ngOnDestroy() {
    this.subcription.unsubscribe()
  }

}
