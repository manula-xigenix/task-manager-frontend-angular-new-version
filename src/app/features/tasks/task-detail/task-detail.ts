import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../../core/services/task.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Task, TaskStatus } from '../../../core/models/task.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-task-detail',
  templateUrl: './task-detail.html',
  standalone: true,
  imports: [CommonModule],
  styleUrls: ['./task-detail.scss']
})
export class TaskDetailComponent implements OnInit {
  task?: Task;
  TaskStatus = TaskStatus; // expose enum to template

  constructor(
    private service: TaskService,
    private route: ActivatedRoute,
    public router: Router
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.params['id'];
    this.service.getById(id).subscribe(t => this.task = t);
  }

  isCompleted(task: Task): boolean {
    return task.status === TaskStatus.Completed;
  }

  getStatusLabel(task: Task): string {
    switch(task.status) {
      case TaskStatus.ToDo: return 'To Do';
      case TaskStatus.InProgress: return 'In Progress';
      case TaskStatus.Completed: return 'Completed';
      default: return '';
    }
  }

  getStatusClass(task: Task): string {
    switch(task.status) {
      case TaskStatus.ToDo: return 'status todo';
      case TaskStatus.InProgress: return 'status in-progress';
      case TaskStatus.Completed: return 'status completed';
      default: return '';
    }
  }
}
