import { Injectable } from '@angular/core';
import { Todo } from '../interfaces/todo';
import { environment } from '../../environments/environment'
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators'
import { errorHandler } from '../helpers/errorHandler'

const API_URL = environment.apiURl
@Injectable({
  providedIn: 'root'
})

export class TodoService {
  titleCache: string = '';
  idForTodo: number = 0;
  todos: Todo[] = [];

  constructor(private http: HttpClient) {
    this.getTodos()
  }

  getTodos(): void {
    this.http.get(`${API_URL}/todos`)
      .pipe(catchError(error => errorHandler(error)))
      .subscribe((response: any) => {
        this.todos = response.splice(0, 5);
      })
  }

  addTodo(todoTitle: string): void {
    this.http.post(`${API_URL}/todos`, {
      title: todoTitle,
      completed: false
    })
      .subscribe((response: any) => {
        this.todos.push({
          id: response.id,
          title: todoTitle,
          completed: false,
          editing: false
        })
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

    this.http.patch(`${API_URL}/todos/${todo.id}`, {
      title: todo.title,
      completed: todo.completed
    })
      .subscribe((response: any) => {
        console.log(response)
      })
  }

  cancelEdit(todo: Todo): void {
    todo.title = this.titleCache
    todo.editing = false
  }

  deleteTodo(id: number): void {
    this.http.delete(`${API_URL}/todos/${id}`)
      .subscribe((response: any) => {
        this.todos = this.todos.filter(todo => todo.id !== id)
      })
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
