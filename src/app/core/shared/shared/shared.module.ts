import { NoteOverviewComponent } from './../../components/note-overview/note-overview.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotePreviewComponent } from '@core/components/note-preview/note-preview.component';

const component = [
  NoteOverviewComponent,
  NotePreviewComponent
]

@NgModule({
  declarations: [component],
  imports: [
    CommonModule
  ],
  exports: [component]
})
export class SharedModule { }
