import { Component, OnInit } from '@angular/core';
import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';
import { TodoService } from './todo.service';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
export class TodoComponent implements OnInit {

	todoForm: FormGroup;
  constructor(private fb: FormBuilder, private todoCall: TodoService) {

  }

  ngOnInit() {
    this.todoForm = this.fb.group({
      details: ['', Validators.required ],
      priority: ['', Validators.required ]
    });
  }

  addtodo = function() {
    let todoBody = {

    }
    // this.todoCall.addtodo(todoBody)
  }
}
