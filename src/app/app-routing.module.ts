import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {UsersListComponent} from './users-list/users-list.component'
import {UserPageComponent} from './user-page/user-page.component'


const routes: Routes = [
  {path:'', component:UsersListComponent},
  {path:'repos/:login', component:UserPageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
