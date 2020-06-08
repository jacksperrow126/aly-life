import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Note } from '@core/models/note.model';

@Injectable({
  providedIn: 'root'
})
export class NoteService {

  allNote: Note[] = [];
  tag = ['Chung', 'Công việc', 'Cuộc sống', 'Học tập', 'Giải trí', 'Gia đình', 'Bạn bè'];
  constructor(private storage: Storage) {
    this.getAllNote();
  }

  getTag(): string[] {
    return this.tag;
  }

  getAllNote(): Note[] {
    this.storage.get('note').then(data => {
      if (data) this.allNote = data;
    })
    return this.allNote;
  }

  saveNote(note: Note): void {
    this.allNote.unshift(note);
    this.storage.set('note', this.allNote);
  }

  removeNote(id: number): void {
    let target = this.allNote.indexOf(this.allNote.find(note => {
      if (note.id == id) return note;
    }));
    console.log(target);
  }

  removeAllNote() {
    this.storage.set('note', []);
  }
}
