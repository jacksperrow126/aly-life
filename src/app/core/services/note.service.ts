import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Note } from '@core/models/note.model';
import { Subject } from 'rxjs';
import { tags } from '@core/data/tags';
import { Tag } from '@core/models/tag.model';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class NoteService {
  public allNote: Note[] = [];
  public tag = tags;
  public tagOnSelect = new Subject();
  public newNote = new Subject();
  public noteOnPress = new Subject();
  constructor(private storage: Storage, private router: Router) {
    this.getAllNote();
  }

  getTag(): Tag[] {
    return this.tag;
  }

  getAllNote(): void {
    this.storage.ready().then(() => {
      this.storage.get('note').then(data => {
        if (data) this.allNote = data;
      })
    })
  }

  saveAllNote() {
    this.storage.ready().then(() => {
      this.storage.set('note', this.allNote).then(() => {
        this.newNote.next('new');
        this.router.navigateByUrl('/note')
      });
    })
  }

  saveNote(note: Note): void {
    this.allNote.unshift(note);
    this.saveAllNote();
  }

  removeAllNote(): void {
    this.storage.set('note', []);
  }

  deleteNote(id: string): void {
    let noteOnDelete = this.allNote.find((note) => {
      return note.id == id
    });
    this.allNote.splice(this.allNote.indexOf(noteOnDelete), 1);
    this.saveAllNote();
  }
}
