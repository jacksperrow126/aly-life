import { DialogDirective } from '@core/directives/dialog.directive';
import { DialogComponent } from '@core/components/templates/dialog/dialog.component';
import { NoteOverviewComponent } from '@core/components/note-overview/note-overview.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotePreviewComponent } from '@core/components/note-preview/note-preview.component';
import { NoteBackgroundDirective } from '@core/directives/note-background.directive';
import { MaterialModule } from '@core/modules/material/material.module';
import { TouchReactDirective } from '@core/directives/touch-react.directive';
import { ScaleFullDirective } from '@core/directives/scale-full.directive';
import { RouteDirective } from '@core/directives/route.directive';
import { MoneyPreviewComponent } from '@core/components/money-preview/money-preview.component';
import { ChartsModule } from 'ng2-charts';

const components = [
  NoteOverviewComponent,
  NotePreviewComponent,
  DialogComponent,
  DialogDirective,
  NoteBackgroundDirective,
  TouchReactDirective,
  ScaleFullDirective,
  RouteDirective,
  MoneyPreviewComponent
]

@NgModule({
  declarations: [components],
  imports: [
    CommonModule,
    ChartsModule,
    MaterialModule,
  ],
  exports: [components, MaterialModule, ChartsModule,],
  entryComponents: [DialogComponent]
})
export class SharedModule { }
