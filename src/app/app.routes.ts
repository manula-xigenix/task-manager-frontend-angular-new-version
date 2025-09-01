// src/app/app.routes.ts
import { Routes } from '@angular/router';
import { LoginComponent } from './features/auth/login/login';
import { TaskListComponent } from './features/tasks/task-list/task-list';
import { TaskDetailComponent } from './features/tasks/task-detail/task-detail';
import { TaskFormComponent } from './features/tasks/task-form/task-form';

export const routes: Routes = [
  { path: '', redirectTo: 'tasks', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'tasks', component: TaskListComponent },
  { path: 'tasks/create', component: TaskFormComponent },
  { path: 'tasks/edit/:id', component: TaskFormComponent },
  { path: 'tasks/:id', component: TaskDetailComponent },
];
