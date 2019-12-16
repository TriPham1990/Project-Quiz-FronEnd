import { Component, OnInit } from '@angular/core';
import {UserService} from '../../../services/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.userService.userOnline = localStorage.getItem('userOnline');
  }

  logout() {
    localStorage.removeItem('ACCESS_TOKEN');
    localStorage.removeItem('userOnline');
    localStorage.setItem('userOnline', '');
    this.ngOnInit();
  }
}
