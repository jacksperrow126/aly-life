import { DialogService } from '@core/services/dialog.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl } from '@angular/forms';
import { NoteService } from '@core/services/note.service';
import { Note } from '@core/models/note.model';
import { Subscription } from 'rxjs';
import { randomID } from '@core/helper/random-id';
import { DialogData } from '@core/models/dialog-data.model';

@Component({
  selector: 'aly-add-note',
  templateUrl: './add-note.component.html',
  styleUrls: ['./add-note.component.scss'],
})
export class AddNoteComponent implements OnInit, OnDestroy {
  public allNote: Note[] = [];
  public tags= new DialogData;
  public selectedTag: string;
  public remarkable = false;
  private subcription: Subscription;
  constructor(private noteService: NoteService, private dialogService: DialogService) { }

  ngOnInit(): void {
    this.subcription = this.noteService.tagOnSelect.subscribe( (data: string) => {
      this.selectedTag = data;
    });
    this.getTags();
  }

  getTags(): void{
    this.tags.type = 'tags',
    this.tags.data = this.noteService.getTag();
  }

  addNote(formNote: FormControl): void {
    if (formNote.value.content === '' || undefined) return;
    if (formNote.value.title === '' || undefined) formNote.value.title = 'Không Đề';
    let ID = randomID();
    formNote.value.id = ID;
    console.log(formNote.value);
  }

  mark(){
    this.remarkable = !this.remarkable;
  }

  ngOnDestroy(): void{
    this.subcription.unsubscribe();
  }
}
