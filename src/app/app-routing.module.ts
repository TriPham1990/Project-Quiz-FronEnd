import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {CreateUserComponent} from './component/users/create-user/create-user.component';
import {LoginUserComponent} from './component/users/login-user/login-user.component';
import {CreateCategoryComponent} from './component/quiz/category/create-category/create-category.component';
import {HomeComponent} from './component/layout/home/home.component';
import {ListCategoryComponent} from './component/quiz/category/list-category/list-category.component';


const routes: Routes = [
  {path: 'register', component: CreateUserComponent},
  {path: 'login', component: LoginUserComponent},
  {path: 'create-category', component: CreateCategoryComponent},
  {path: 'home', component: HomeComponent},
  {path: 'list-category', component: ListCategoryComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
