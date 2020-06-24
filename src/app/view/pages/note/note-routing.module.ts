import { AddNoteComponent } from './add-note/add-note.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NotePage } from './note.page';
import { EditComponent } from './edit/edit.component';

const routes: Routes = [
  {
    path: '',
    component: NotePage
  },
  {
    path: 'add',
    component: AddNoteComponent
  },
  {
    path: 'edit',
    component: EditComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NotePageRoutingModule { }
