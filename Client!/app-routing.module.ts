import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddtaskComponent } from './addtask/addtask.component';
import { MainComponent } from './main/main.component';
import { TaskpostComponent } from './taskpost/taskpost.component';
import { UsersComponent } from './users/users.component';

const routes: Routes = [{path:"" , component : UsersComponent },
                       {path : "taskpost",component: TaskpostComponent}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
