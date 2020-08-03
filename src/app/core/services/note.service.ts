import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Note } from '@core/models/note/note.model';
import { Subject, BehaviorSubject } from 'rxjs';
import { tags } from '@core/data/tags';
import { Tag } from '@core/models/note/tag.model';
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
  public noteOnEdit = new BehaviorSubject(null);
  public selectedTag;
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

  saveAllNote(): void {
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

  editNote(note: Note): void {
    let index;
    for (let i = 0; i < this.allNote.length; i++) {
      if (this.allNote[i].id == note.id) {
        index = i;
        break;
      }
    }
    this.allNote.splice(index, 1, note);
    this.saveAllNote();
  }

  removeAllNote(): void {
    this.storage.set('note', []);
  }

  deleteNote(id: string): void {
    let index;
    for (let i = 0; i < this.allNote.length; i++) {
      if (this.allNote[i].id == id) {
        index = i;
        break;
      }
    }
    this.allNote.splice(index, 1);
    this.saveAllNote();
  }
}
