import { AddNoteComponent } from './add-note/add-note.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NotePage } from './note.page';

const routes: Routes = [
  {
    path: '',
    component: NotePage
  },
  {
    path: 'add',
    component: AddNoteComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NotePageRoutingModule {}
