import { Routes } from '@angular/router';
import { LoginComponent } from './features/auth/login/login';
import { SignupComponent } from './features/auth/signup/signup';
import { TaskListComponent } from './features/tasks/task-list/task-list';
import { TaskDetailComponent } from './features/tasks/task-detail/task-detail';
import { TaskFormComponent } from './features/tasks/task-form/task-form';
import { TaskCompleted } from './features/tasks/task-completed/task-completed';
import { TaskRemaining } from './features/tasks/task-remaining/task-remaining';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent }, 

  { path: 'tasks', component: TaskListComponent, canActivate: [authGuard] },
  { path: 'completed-tasks', component: TaskCompleted, canActivate: [authGuard] },
  { path: 'remaining-tasks', component: TaskRemaining, canActivate: [authGuard] },
  { path: 'tasks/create', component: TaskFormComponent, canActivate: [authGuard] },
  { path: 'tasks/edit/:id', component: TaskFormComponent, canActivate: [authGuard] },
  { path: 'tasks/:id', component: TaskDetailComponent, canActivate: [authGuard] },

  { path: '**', redirectTo: 'login' }, 
];
