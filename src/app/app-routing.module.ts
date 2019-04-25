import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TodoComponent } from './components/todo/todo.component';
import { InfoComponent } from './components/info/info.component';

const routes: Routes = [
	{
	    path: 'todo',
	    component: TodoComponent
	},
	{
	    path: 'info',
	    component: InfoComponent
	},
	{
	    path: '**',
	    component: TodoComponent
	}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
