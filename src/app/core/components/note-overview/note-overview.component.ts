import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NoteService } from '@core/services/note.service';

@Component({
  selector: 'aly-note-overview',
  templateUrl: './note-overview.component.html',
  styleUrls: ['./note-overview.component.scss'],
})
export class NoteOverviewComponent implements OnInit {

  constructor(private router: Router, private noteService: NoteService) { }

  ngOnInit() { }

  go() {
    setTimeout(() => {
      this.noteService.selectedTag = undefined;
      this.router.navigateByUrl('/note')
    }, 100)
  }
}
