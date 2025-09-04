import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Task } from '../models/task.model';

@Injectable({ providedIn: 'root' })
export class TaskService {
  private api = 'https://localhost:44368/api/Tasks';

  constructor(private http: HttpClient) {}

  /** Get all tasks */
  getAll(): Observable<Task[]> {
    return this.http.get<Task[]>(this.api);
  }

  /** Get only remaining tasks (status != Completed) */
  getRemaining(): Observable<Task[]> {
    return this.http.get<Task[]>(`${this.api}/remaining`);
  }

  /** Get only completed tasks (status == Completed) */
  getCompleted(): Observable<Task[]> {
    return this.http.get<Task[]>(`${this.api}/completed`);
  }

  /** Count completed tasks */
  getCompletedCount(): Observable<number> {
    return this.http.get<number>(`${this.api}/completed/count`);
  }

  /** Count remaining tasks */
  getRemainingCount(): Observable<number> {
    return this.http.get<number>(`${this.api}/remaining/count`);
  }

  /** Get tasks by user or other filter id */
  getTasks(id: string): Observable<Task[]> {
    return this.http.get<Task[]>(`${this.api}/user/${id}`);
  }

  /** Get single task by ID */
  getById(id: string): Observable<Task> {
    return this.http.get<Task>(`${this.api}/${id}`);
  }

  /** Create a new task */
  create(task: Task): Observable<Task> {
    return this.http.post<Task>(this.api, task);
  }

  /** Update a task */
  update(id: string, task: Task): Observable<void> {
    return this.http.put<void>(`${this.api}/${id}`, task);
  }

  /** Delete a task */
  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.api}/${id}`);
  }
}
