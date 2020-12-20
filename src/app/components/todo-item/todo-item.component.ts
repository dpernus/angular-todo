import { animate, style, transition, trigger } from '@angular/animations';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Todo } from 'src/app/interfaces/todo';
import { TodoService } from 'src/app/services/todo.service';

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

  constructor(public todoService: TodoService) { }

  ngOnInit(): void {
  }
}
