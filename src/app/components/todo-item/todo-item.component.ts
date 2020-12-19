import { animate, style, transition, trigger } from '@angular/animations';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Todo } from 'src/app/interfaces/todo';

@Component({
  selector: 'todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.scss'],
  animations: [
    trigger('fade', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(30px)' }),
        animate(300, style({ opacity: 1, transform: 'translateY(0px)' }))
      ]),
      transition(':leave', [
        animate(300, style({ opacity: 0, transform: 'translateY(30px)' }))
      ]),
    ])
  ]

})
export class TodoItemComponent implements OnInit {
  @Input() todo: Todo = {
    id: 0,
    title: '',
    editing: false,
    completed: false
  };

  @Output() checkedItem = new EventEmitter()
  @Output() doubleClickedItem = new EventEmitter()
  @Output() cancelledItem = new EventEmitter()
  @Output() deletedItem = new EventEmitter()

  constructor() { }

  ngOnInit(): void {
  }

  doneEdit(todo: Todo): void {
    this.checkedItem.emit(todo)
  }

  editTodo(todo: Todo): void {
    this.doubleClickedItem.emit(todo)
  }

  cancelEdit(todo: Todo): void {
    this.cancelledItem.emit(todo);
  }

  deleteTodo(todo: Todo): void {
    this.deletedItem.emit(todo);
  }
}
