import { Component, Input, Output, EventEmitter } from '@angular/core';
import { TaskService } from '../../services/task.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-task-item',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './task-item.component.html',
  styleUrls: ['./task-item.component.css']
})
export class TaskItemComponent {
  @Input() task: any;
  @Output() taskUpdated = new EventEmitter<void>();

  constructor(private taskService: TaskService) { }

  markAsCompleted(): void {
    const updatedTask = { ...this.task, status: 'completed' };
    this.taskService.updateTask(this.task._id, updatedTask).subscribe(() => {
      this.taskUpdated.emit();
    });
  }

  editTask(): void {
    const description = prompt('Update task description', this.task.description);
    if (description && description.trim()) {
      const updatedTask = { ...this.task, description: description.trim() };
      this.taskService.updateTask(this.task._id, updatedTask).subscribe(() => {
        this.taskUpdated.emit();
      });
    }
  }

  deleteTask(): void {
    if (confirm('Are you sure you want to delete this task?')) {
      this.taskService.deleteTask(this.task._id, this.task).subscribe(() => {
        this.taskUpdated.emit();
      });
    }
  }
}