import { Injectable } from '@angular/core';
import { Todo } from '../interfaces/todo';

@Injectable({
  providedIn: 'root'
})

export class TodoService {
  titleCache: string = '';
  idForTodo: number = 0;
  todos: Todo[] = [
    {
      'id': 1,
      'title': 'Finish Angular Screencast',
      'completed': false,
      'editing': false,
    },
    {
      'id': 2,
      'title': 'Take over world',
      'completed': false,
      'editing': false,
    },
    {
      'id': 3,
      'title': 'One more thing',
      'completed': false,
      'editing': false,
    },
  ];

  constructor() { }

  addTodo(todoTitle: string): void {
    this.todos.push({
      id: this.idForTodo,
      title: todoTitle,
      completed: false,
      editing: false
    })

    this.idForTodo++;
  }

  editTodo(todo: Todo): void {
    this.titleCache = todo.title
    todo.editing = true
  }

  doneEdit(todo: Todo): void {
    if (todo.title.trim().length === 0) {
      todo.title = this.titleCache
    }
    todo.editing = false
  }

  cancelEdit(todo: Todo): void {
    todo.title = this.titleCache
    todo.editing = false
  }

  deleteTodo(id: number): void {
    this.todos = this.todos.filter(todo => todo.id !== id)
  }

  remainingTodos(): number {
    return this.todos.filter(todo => !todo.completed).length
  }

  atLeastOneCompleted(): boolean {
    return (this.todos.filter(todo => todo.completed).length > 0)
  }

  clearCompleted(): void {
    this.todos = this.todos.filter(todo => !todo.completed)
  }

  checkAllTodos(): void {
    this.todos.forEach(todo => todo.completed = (<HTMLInputElement>event.target).checked)
  }

  todosFiltered(selectedFilter: string): Todo[] {
    switch (selectedFilter) {
      case 'all': return this.todos
      case 'pending': return this.todos.filter(todo => !todo.completed)
      case 'completed': return this.todos.filter(todo => todo.completed)
      default: return this.todos;
    }
  }
}
