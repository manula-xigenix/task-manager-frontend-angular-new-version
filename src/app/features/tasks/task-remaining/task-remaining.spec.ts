import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskRemaining } from './task-remaining';

describe('TaskRemaining', () => {
  let component: TaskRemaining;
  let fixture: ComponentFixture<TaskRemaining>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaskRemaining]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TaskRemaining);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
