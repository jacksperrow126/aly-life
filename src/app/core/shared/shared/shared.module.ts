import { DialogDirective } from '@core/directives/dialog.directive';
import { DialogComponent } from '@core/components/templates/dialog/dialog.component';
import { NoteOverviewComponent } from '@core/components/note-overview/note-overview.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotePreviewComponent } from '@core/components/note-preview/note-preview.component';
import { NoteBackgroundDirective } from '@core/directives/note-background.directive';
import { MaterialModule } from '@core/modules/material/material.module';

const component = [
  NoteOverviewComponent,
  NotePreviewComponent,
  DialogComponent,
  DialogDirective,
  NoteBackgroundDirective
]

@NgModule({
  declarations: [component],
  imports: [
    CommonModule,
    MaterialModule
  ],
  exports: [component, MaterialModule],
  entryComponents: [DialogComponent]
})
export class SharedModule { }
