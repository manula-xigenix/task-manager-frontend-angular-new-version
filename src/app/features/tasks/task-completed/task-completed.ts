import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../../core/services/task.service';
import { Task } from '../../../core/models/task.model';
import { Router } from '@angular/router';
import { CommonModule, NgIf, NgForOf } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-task-completed',
  standalone: true,
  imports: [CommonModule, NgIf, NgForOf, FormsModule],
  templateUrl: './task-completed.html',
  styleUrls: ['./task-completed.scss']
})
export class TaskCompleted implements OnInit {
  tasks: Task[] = [];
  searchTerm: string = '';
  completedCount: number = 0;  

  constructor(private service: TaskService, public router: Router) {}

  ngOnInit() {
    this.loadTasks();
    this.loadCount();
  }

  loadTasks() {
    this.service.getCompleted().subscribe({
      next: res => this.tasks = res,
      error: err => console.error(err)
    });
  }

  loadCount() {
    this.service.getCompletedCount().subscribe({
      next: res => this.completedCount = res,
      error: err => console.error(err)
    });
  }

  get filteredTasks() {
    if (!this.searchTerm.trim()) {
      return this.tasks;
    }
    const lower = this.searchTerm.toLowerCase();
    return this.tasks.filter(t =>
      t.title.toLowerCase().includes(lower) ||
      t.description!.toLowerCase().includes(lower)
    );
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
