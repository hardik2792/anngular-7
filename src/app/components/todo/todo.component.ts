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
  priority: any;
  todoList: any = [];

  constructor(private fb: FormBuilder, private todoCall: TodoService) {

  }

  ngOnInit() {
    this.gettodo();
    this.todoForm = this.fb.group({
      details: ['', Validators.required ]
    });
  }

  addtodo() {
    let todoBody = this.todoForm.value;
    console.log("this.todoForm", this.todoForm.value);
    todoBody.priority = this.priority;
    this.todoCall.addtodo(todoBody).subscribe(
           (addedTodo: any) => {
             this.todoList.push(addedTodo.data);
             console.log(this.todoList);
           },
           error => {
             console.log("Error! Getting Todo List");
           }
        );
  }

  gettodo() {
    this.todoCall.gettodo().subscribe(
           (todoData: any) => {
             this.todoList = todoData.data;
             console.log(this.todoList);
           },
           error => {
             console.log("Error! Getting Todo List");
           }
        );
  }

  updatetodo(todo){
    this.todoCall.updatetodo(todo).subscribe(
           (updatedTodo: any) => {
             todo.isEdit = false;
             console.log(this.todoList);
           },
           error => {
             console.log("Error! Getting Todo List");
           }
        );
  }

  markComplete(todo){
    todo.isCompleted = !todo.isCompleted;
    this.todoCall.updatetodo(todo).subscribe(
           (updatedTodo: any) => {
             todo.isEdit = false;
             console.log(this.todoList);
           },
           error => {
             console.log("Error! Getting Todo List");
           }
        );
  }

  generatingFile(type) {
    this.todoCall.generatingFile(type).subscribe(
           (fileData: any) => {
             console.log(fileData);
             window.open(fileData.data, '_blank');
           },
           error => {
             console.log("Error! Getting Todo List");
           }
        );
  }

  dbBackUp(){
     this.todoCall.generatingFile('csv').subscribe(
           (fileData: any) => {
             console.log(fileData);
             window.open(fileData.data, '_blank');
           },
           error => {
             console.log("Error! Getting Todo List");
           }
        );
  }
}
