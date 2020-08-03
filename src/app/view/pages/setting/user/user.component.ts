import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { UserService } from '@core/services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'aly-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent implements OnInit {

  public isErr = false;
  constructor(private userService: UserService, private router: Router) { }

  ngOnInit() { }

  onSubmit(form: FormControl) {
    if (!form.valid) {
      this.isErr = true;
      return;
    }
    this.userService.updateName(form.value.name);
    this.router.navigateByUrl('/setting');
  }
}
