import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../../core/services/task.service';
import { Task, TaskStatus } from '../../../core/models/task.model';
import { Router } from '@angular/router';
import { CommonModule, NgIf, NgForOf } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [CommonModule, NgIf, NgForOf, FormsModule],
  templateUrl: './task-list.html',
  styleUrls: ['./task-list.scss']
})
export class TaskListComponent implements OnInit {
  tasks: Task[] = [];
  searchTerm: string = '';
  TaskStatus = TaskStatus; // expose enum to template

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

  get filteredTasks() {
    if (!this.searchTerm.trim()) return this.tasks;

    const lower = this.searchTerm.toLowerCase();
    return this.tasks.filter(
      t =>
        t.title.toLowerCase().includes(lower) ||
        t.description!.toLowerCase().includes(lower)
    );
  }

  editTask(task: Task) {
    this.router.navigate(['/tasks/edit', task.id]);
  }

  deleteTask(task: Task) {
    this.service.delete(task.id!).subscribe(() => this.loadTasks());
  }

  isCompleted(task: Task): boolean {
    return task.status === TaskStatus.Completed;
  }

  getStatusLabel(task: Task): string {
    switch (task.status) {
      case TaskStatus.ToDo: return 'To Do';
      case TaskStatus.InProgress: return 'In Progress';
      case TaskStatus.Completed: return 'Completed';
      default: return '';
    }
  }
}
