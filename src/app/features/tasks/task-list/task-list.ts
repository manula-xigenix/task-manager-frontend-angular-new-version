// src/app/features/tasks/task-list/task-list.ts
import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../../core/services/task.service';
import { Task } from '../../../core/models/task.model';
import { Router } from '@angular/router';
import { CommonModule, NgIf, NgForOf } from '@angular/common';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.html',
  standalone: true,
  imports: [CommonModule, NgIf, NgForOf],
  styleUrls: ['./task-list.scss']
})
export class TaskListComponent implements OnInit {
  tasks: Task[] = [];

  constructor(private service: TaskService, public router: Router) {}

  ngOnInit() {
    this.loadTasks();
  }

  loadTasks() {
    this.service.getAll().subscribe({
      next: res => this.tasks = res,
      error: err => console.error(err)
    });
  }

  editTask(task: Task) {
    this.router.navigate(['/tasks/edit', task.id]);
  }

  deleteTask(task: Task) {
    this.service.delete(task.id!).subscribe(() => this.loadTasks());
  }
}
