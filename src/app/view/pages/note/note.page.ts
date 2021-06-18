import {
  Component,
  OnInit,
  OnDestroy,
  ViewChild,
  ElementRef,
} from '@angular/core';
import { Storage } from '@ionic/storage';
import { Subscription } from 'rxjs';
import { NoteService } from '@core/services/note.service';
import { Note } from '@core/models/note/note.model';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { DialogData } from '@core/models/template/dialog-data.model';
import { Tag } from '@core/models/note/tag.model';
import { NoteOnPress } from '@core/models/note/note-press.model';
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
  public tags = new DialogData();
  public isSelectTag = false;
  private noteContainer: NoteOnPress;
  public tagSelect = 'Nhóm';
  public dateSelect = 'Ngày';
  private subcription1: Subscription;
  private subcription2: Subscription;
  @ViewChild('cancel') cancel: ElementRef;
  constructor(private storage: Storage, private noteService: NoteService) {}

  ngOnInit() {
    this.getAllNote();
    this.getTags();
    this.subcribePressAction();
    this.pickTag();
  }

  getAllNote() {
    this.storage.ready().then(() => {
      this.storage.get('note').then((data: Note[]) => {
        if (data) {
          this.notesTemplate = data;
          this.notes = data;
          if (this.noteService.selectedTag !== undefined) {
            this.notes = this.notesTemplate.filter((note) => {
              return note.tag.text === this.noteService.selectedTag.text;
            });
          }
        }
      });
      this.subcription = this.noteService.newNote.subscribe(() => {
        this.storage.get('note').then((data: Note[]) => {
          this.notesTemplate = data;
          this.notes = data;
        });
      });
    });
  }

  getTags() {
    (this.tags.type = 'tags'), (this.tags.data = this.noteService.getTag());
  }

  pickDate(event: MatDatepickerInputEvent<Date>) {
    const date = event.value;
    this.notes = this.notesTemplate.filter((note) => {
      const noteDate = new Date(note.date);
      return noteDate.getDate() === date.getDate();
    });
    this.tagSelect = 'Nhóm';
    this.dateSelect = `${date.getDate()}/${date.getMonth() + 1}`;
  }

  pickTag() {
    this.subcription1 = this.noteService.tagOnSelect.subscribe((data: Tag) => {
      if (
        this.notes === null ||
        this.notes === undefined ||
        this.notesTemplate == null
      ) {
        return;
      }
      this.notes = this.notesTemplate.filter((note) => {
        return note.tag.text === data.text;
      });
      this.tagSelect = data.text;
    });
    this.dateSelect = 'Ngày';
  }

  showAll() {
    this.notes = this.notesTemplate;
    this.tagSelect = 'Nhóm';
    this.dateSelect = 'Ngày';
  }

  subcribePressAction() {
    this.subcription2 = this.noteService.noteOnPress.subscribe(
      (data: NoteOnPress) => {
        this.noteContainer = data;
        this.cancel.nativeElement.classList.remove('hide');
      }
    );
  }

  unpress() {
    if (this.noteContainer === undefined) {
      return;
    }
    this.noteContainer.notes.forEach((note) => {
      note.classList.remove('shake');
    });
    this.noteContainer.delete.forEach((del) => {
      del.classList.add('hide');
    });
    this.noteContainer.edit.forEach((del) => {
      del.classList.add('hide');
    });
    this.cancel.nativeElement.classList.add('hide');
  }

  ngOnDestroy() {
    this.subcription.unsubscribe();
    this.subcription1.unsubscribe();
    this.subcription2.unsubscribe();
  }
}
