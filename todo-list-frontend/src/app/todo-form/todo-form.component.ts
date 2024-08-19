import { Component } from '@angular/core';
import { TodoService } from '../todo.service';

@Component({
  selector: 'app-todo-form',
  templateUrl: './todo-form.component.html',
  styleUrls: ['./todo-form.component.css']
})
export class TodoFormComponent {
  title: string | undefined;

  constructor(private todoService: TodoService) { }

  addTodo() {
    const todo = { title: this.title, completed: false };
    this.todoService.addTodo(todo).subscribe(() => {
      console.log('Todo added successfully!');
    });
  }
}