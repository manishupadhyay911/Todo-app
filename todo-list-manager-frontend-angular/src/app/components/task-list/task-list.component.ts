import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../services/task.service';
import { TaskItemComponent } from '../task-item/task-item.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [TaskItemComponent, CommonModule, FormsModule],
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {
  tasks: any[] = [];
  filter: string = 'all';
  newTask: any = {
    description: '',
    dueDate: '',
    tags: ''
  };

  constructor(private taskService: TaskService) { }

  ngOnInit(): void {
    this.getTasks();
  }

  getTasks(): void {
    let status = this.filter === 'all' ? '' : this.filter;
    this.taskService.getTasks(status).subscribe(tasks => this.tasks = tasks);
  }

  onFilterChange(filter: string): void {
    this.filter = filter;
    this.getTasks();
  }

  onSubmit(): void {
    if (this.newTask.description.trim()) {
      this.taskService.addTask(this.newTask).subscribe(() => {
        this.getTasks();
        this.newTask = {
          description: '',
          dueDate: '',
          tags: ''
        };
      });
    }
  }

  onUndo(): void {
    this.taskService.undo().subscribe(() => this.getTasks());
  }

  onRedo(): void {
    this.taskService.redo().subscribe(() => this.getTasks());
  }

  canUndo(): boolean {
    return this.taskService.canUndo();
  }

  canRedo(): boolean {
    return this.taskService.canRedo();
  }
}