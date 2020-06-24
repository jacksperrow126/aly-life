import { Component, OnInit, OnDestroy } from '@angular/core';
import { NoteService } from '@core/services/note.service';
import { Note } from '@core/models/note.model';
import { Tag } from '@core/models/tag.model';
import { DialogData } from '@core/models/dialog-data.model';
import { FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'aly-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss'],
})
export class EditComponent implements OnInit, OnDestroy {
  public title: string;
  public content: string;
  public selectedTag: Tag;
  public remarkable: boolean;
  public tags = new DialogData();
  private note: Note;
  private subcription: Subscription;
  constructor(private noteService: NoteService) { }

  ngOnInit(): void {
    this.getNote();
    this.onChangeTag();
  }

  getNote(): void {
    this.noteService.noteOnEdit.subscribe((data: Note) => {
      this.note = data
      this.title = data.title;
      this.content = data.content;
      this.selectedTag = data.tag;
      this.remarkable = data.remark;
      this.tags.type = 'tags',
        this.tags.data = this.noteService.getTag();
    });
  }
  editNote(formNote: FormControl): void {
    if (formNote.value.content === '' || undefined) return;
    if (formNote.value.title === '' || undefined) formNote.value.title = 'Không Đề';
    if (this.selectedTag === undefined) this.selectedTag = { type: 'common', text: 'Chung' };
    formNote.value.id = this.note.id;
    formNote.value.date = this.note.date;
    formNote.value.tag = this.selectedTag;
    formNote.value.remark = this.remarkable;
    this.noteService.editNote(formNote.value);
  }

  mark(): void {
    this.remarkable = !this.remarkable;
  }

  onChangeTag(): void {
    this.subcription = this.noteService.tagOnSelect.subscribe((data: Tag) => {
      this.selectedTag = data;
    });
  }

  ngOnDestroy(): void {
    this.subcription.unsubscribe();
  }
}
