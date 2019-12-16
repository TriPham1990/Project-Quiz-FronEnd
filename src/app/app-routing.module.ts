import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {CreateUserComponent} from './component/users/create-user/create-user.component';
import {LoginUserComponent} from './component/users/login-user/login-user.component';
import {CategoryComponent} from './component/quiz/category/category.component';


const routes: Routes = [
  {path: 'register', component: CreateUserComponent},
  {path: 'login', component: LoginUserComponent},
  {path: 'create-category', component: CategoryComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
