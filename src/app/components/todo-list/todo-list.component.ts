import { Component, OnInit } from '@angular/core';
import { Todo } from 'src/app/interfaces/todo';
import { TodoService } from 'src/app/services/todo.service';

@Component({
  selector: 'todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss'],
  providers: [
    TodoService
  ],
})

export class TodoListComponent implements OnInit {
  todoTitle: string = '';
  filter: string = 'all';

  constructor(public todoService: TodoService) {
  }

  ngOnInit(): void {
    this.todoTitle = '';
  }

  addTodo(): void {
    if (this.todoTitle.trim().length === 0) {
      return
    }

    this.todoService.addTodo(this.todoTitle)

    this.todoTitle = ''
  }


}
