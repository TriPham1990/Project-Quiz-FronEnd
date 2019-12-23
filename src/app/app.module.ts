import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './component/layout/navbar/navbar.component';
import { HeaderComponent } from './component/layout/header/header.component';
import { FooterComponent } from './component/layout/footer/footer.component';
import { LoginUserComponent } from './component/users/login-user/login-user.component';
import { CreateUserComponent } from './component/users/create-user/create-user.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {RouterModule} from '@angular/router';
import {JwtInterceptor} from './interceptor/JwtInterceptor';
import { CreateCategoryComponent } from './component/quiz/category/create-category/create-category.component';
import { HomeComponent } from './component/layout/home/home.component';
import {ListCategoryComponent} from './component/quiz/category/list-category/list-category.component';
import { CreateQuestionComponent } from './component/quiz/question/create-question/create-question.component';
import { ListQuestionComponent } from './component/quiz/question/list-question/list-question.component';
import {NgxPaginationModule} from 'ngx-pagination';
import { CreateQuizComponent } from './component/quiz/quiz/create-quiz/create-quiz.component';
import { ListQuizComponent } from './component/quiz/quiz/list-quiz/list-quiz.component';
import { EditCategoryComponent } from './component/quiz/category/edit-category/edit-category.component';
import { EditQuestionComponent } from './component/quiz/question/edit-question/edit-question.component';
import { StartQuizComponent } from './component/quiz/quiz/start-quiz/start-quiz.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HeaderComponent,
    FooterComponent,
    LoginUserComponent,
    CreateUserComponent,
    CreateCategoryComponent,
    HomeComponent,
    ListCategoryComponent,
    CreateQuestionComponent,
    ListQuestionComponent,
    CreateQuizComponent,
    ListQuizComponent,
    EditCategoryComponent,
    EditQuestionComponent,
    StartQuizComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule,
    FormsModule,
    NgxPaginationModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
