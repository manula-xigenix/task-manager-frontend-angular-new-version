import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../../core/services/task.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Task } from '../../../core/models/task.model';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.html',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
})
export class TaskFormComponent implements OnInit {
  taskId?: string;
  form!: FormGroup;

  constructor(
    private service: TaskService,
    private route: ActivatedRoute,
    public router: Router,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.taskId = this.route.snapshot.params['id'];

    this.form = this.fb.group({
      title: ['', Validators.required],
      description: [''],
      isCompleted: [false],
      dueDate: ['']
    });

    if (this.taskId) {
      this.service.getById(this.taskId).subscribe((task: Task) => {
        this.form.patchValue(task);
      });
    }
  }

  onSubmit() {
    const task: Task = this.form.value;

    if (this.taskId) {
      this.service.update(this.taskId, task).subscribe(() => this.router.navigate(['/tasks']));
    } else {
      this.service.create(task).subscribe(() => this.router.navigate(['/tasks']));
    }
  }
}
