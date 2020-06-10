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
  constructor(private storage: Storage, private router: Router) {
    this.getAllNote();
  }

  getTag(): Tag[] {
    return this.tag;
  }

  getAllNote(): void {
    this.storage.get('note').then(data => {
      if (data) this.allNote = data;
    })
  }

  saveNote(note: Note): void {
    this.allNote.unshift(note);
    this.storage.set('note', this.allNote).then(() => {
      this.newNote.next('new');
      this.router.navigateByUrl('/note')
    });
  }

  removeNote(id: number): void {
    let target = this.allNote.indexOf(this.allNote.find(note => {
      if (note.id == id) return note;
    }));

  }

  removeAllNote(): void {
    this.storage.set('note', []);
  }


}
