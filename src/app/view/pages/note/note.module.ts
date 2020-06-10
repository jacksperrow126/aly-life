import { SharedModule } from '@core/shared/shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NotePageRoutingModule } from './note-routing.module';

import { NotePage } from './note.page';
import { AddNoteComponent } from './add-note/add-note.component';
import { NoteDetailComponent } from './note-detail/note-detail.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NotePageRoutingModule,
    SharedModule
  ],
  declarations: [NotePage, AddNoteComponent, NoteDetailComponent]
})
export class NotePageModule { }
