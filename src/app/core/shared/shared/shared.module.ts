import { DialogDirective } from '@core/directives/dialog.directive';
import { DialogComponent } from '@core/components/templates/dialog/dialog.component';
import { NoteOverviewComponent } from '@core/components/note-overview/note-overview.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotePreviewComponent } from '@core/components/note-preview/note-preview.component';

const component = [
  NoteOverviewComponent,
  NotePreviewComponent,
  DialogComponent,
  DialogDirective
]

@NgModule({
  declarations: [component],
  imports: [
    CommonModule,
  ],
  exports: [component],
  entryComponents: [DialogComponent]
})
export class SharedModule { }
