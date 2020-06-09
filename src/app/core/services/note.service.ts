import { Injectable} from '@angular/core';
import { Storage } from '@ionic/storage';
import { Note } from '@core/models/note.model';
import { Subject } from 'rxjs';
import { tags } from '@core/data/tags';

@Injectable({
  providedIn: 'root'
})
export class NoteService {
  public allNote: Note[] = [];
  public tag = tags;
  public tagOnSelect = new Subject();
  public ImgOnSelect = new Subject();
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

  removeAllNote(): void {
    this.storage.set('note', []);
  }

  
}
