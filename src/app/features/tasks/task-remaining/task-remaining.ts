import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../../core/services/task.service';
import { Task, TaskStatus } from '../../../core/models/task.model';
import { Router } from '@angular/router';
import { CommonModule, NgIf, NgForOf } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-task-remaining',
  standalone: true,
  imports: [CommonModule, NgIf, NgForOf, FormsModule],
  templateUrl: './task-remaining.html',
  styleUrls: ['./task-remaining.scss']
})
export class TaskRemaining implements OnInit {
  tasks: Task[] = [];
  searchTerm: string = '';
  remainingCount: number = 0;
  TaskStatus = TaskStatus; 

  constructor(private service: TaskService, public router: Router) {}

  ngOnInit() {
    this.loadTasks();
    this.loadCount();
  }

  loadTasks() {
    this.service.getRemaining().subscribe({
      next: res => this.tasks = res,
      error: err => console.error(err)
    });
  }

  loadCount() {
    this.service.getRemainingCount().subscribe({
      next: res => this.remainingCount = res,
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

  isCompleted(task: Task) {
    return task.status === TaskStatus.Completed;
  }

  editTask(task: Task) {
    this.router.navigate(['/tasks/edit', task.id]);
  }

  deleteTask(task: Task) {
    this.service.delete(task.id!).subscribe(() => {
      this.loadTasks();
      this.loadCount();
    });
  }
}
