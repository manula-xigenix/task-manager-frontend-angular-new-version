import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../../core/services/task.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Task } from '../../../core/models/task.model';
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

  constructor(
    private service: TaskService,
    private route: ActivatedRoute,
    public router: Router
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.params['id'];
    this.service.getById(id).subscribe(t => this.task = t);
  }
}
