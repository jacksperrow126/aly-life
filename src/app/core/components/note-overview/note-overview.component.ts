import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'aly-note-overview',
  templateUrl: './note-overview.component.html',
  styleUrls: ['./note-overview.component.scss'],
})
export class NoteOverviewComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {}

  test(){
    this.router.navigateByUrl('/note')
  }
}
