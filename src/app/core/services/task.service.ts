// src/app/core/services/task.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Task } from '../models/task.model';

@Injectable({ providedIn: 'root' })
export class TaskService {
  private api = 'https://localhost:44368/api/Tasks';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Task[]> {
    return this.http.get<Task[]>(this.api);
  }

  getById(id: string): Observable<Task> {
    return this.http.get<Task>(`${this.api}/${id}`);
  }

  create(task: Task): Observable<Task> {
    return this.http.post<Task>(this.api, task);
  }

  update(id: string, task: Task): Observable<void> {
    return this.http.put<void>(`${this.api}/${id}`, task);
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.api}/${id}`);
  }
}
