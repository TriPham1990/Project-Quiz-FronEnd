import { Component, OnInit } from '@angular/core';
import {User} from '../../../interface/user';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Login} from '../../../interface/login';
import {UserService} from '../../../services/user.service';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent implements OnInit {
  user: User;
  createUserForm: FormGroup;
  check: boolean;
  login: Login;

  constructor(private fb: FormBuilder, private userService: UserService) { }

  ngOnInit() {
    this.createUserForm = this.fb.group({
      name: [null, [Validators.required, Validators.minLength(6), Validators.maxLength(40)]],
      username: [null, [Validators.required, Validators.minLength(6), Validators.maxLength(20)]],
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required, Validators.minLength(6), Validators.maxLength(16)]],
      confirmPassword: [null, Validators.required]
    },
      {validators: this.checkPassword}
      );
  }

  checkPassword(group: FormGroup) {
    const password = group.get('password').value;
    const confirmPassword = group.get('confirmPassword').value;
    return password === confirmPassword ? null : {notSame: true};
  }

  onSubmit() {
    if (this.createUserForm.valid) {
      this.TransferFormDataToUser();
      this.userService.createUSer(this.user).subscribe(
        result => {
          this.login = {username: this.createUserForm.get('username').value, password: this.createUserForm.get('password').value};
          this.userService.userLogin(this.login).subscribe(data => {
            localStorage.setItem('ACCESS_TOKEN', data.token);
            this.check = true;
          });
        }, error => {
          this.check = false;
        }
      );
    }
  }

  TransferFormDataToUser() {
    this.user = {
      name: this.createUserForm.get('name').value,
      username: this.createUserForm.get('username').value,
      email: this.createUserForm.get('email').value,
      password: this.createUserForm.get('password').value,
      role: ['user']
    };
  }

}
