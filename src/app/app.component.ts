import { Component } from '@angular/core';
import {UserService} from './services/user/user.service';
import {AuthService, SocialUser, FacebookLoginProvider, GoogleLoginProvider} from 'ng4-social-login';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Quiz-FrontEnd';
  public user: any = SocialUser;

  constructor(
    private socialAuthservice: AuthService,
    private userService: UserService) {
  }

  facebooklogin() {
    this.socialAuthservice.signIn(FacebookLoginProvider.PROVIDER_ID).then((userData) => {
      this.user = userData;
    });
  }
  googlelogin() {
    this.socialAuthservice.signIn(GoogleLoginProvider.PROVIDER_ID).then((userData) => {
      this.user = userData;
    });
  }
}
