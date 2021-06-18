import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { User } from '@core/models/user/user.model';
import { UserService } from '@core/services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'aly-password',
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.scss'],
})
export class PasswordComponent implements OnInit {
  public user: User;
  public isErr = false;
  constructor(private userService: UserService, private router: Router) {}

  ngOnInit() {
    this.user = this.userService.user;
  }

  onSubmit(pass: FormControl) {
    if (!pass.valid) {
      this.isErr = true;
      return;
    }
    if (pass.value.password !== pass.value.confirmPassword) {
      this.isErr = true;
      return;
    }
    if (this.user.password) {
      if (pass.value.oldPassword !== this.user.password) {
        this.isErr = true;
        return;
      }
    }
    this.user.password = pass.value.password;
    pass.reset();
    this.isErr = false;
    this.userService.updatePassword(this.user.password);
    this.router.navigateByUrl('/setting');
  }
}
