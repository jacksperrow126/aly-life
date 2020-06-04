import { NoteOverviewComponent } from './../../components/note-overview/note-overview.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

const component = [
  NoteOverviewComponent
]

@NgModule({
  declarations: [component],
  imports: [
    CommonModule
  ],
  exports: [component]
})
export class SharedModule { }
