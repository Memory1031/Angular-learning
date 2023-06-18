import { Component, OnInit } from '@angular/core';
import { Todo, TodoStatusType } from './models/todo.model';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'OneToDo';
  placeholder = "What needs to be done?";

  toggleAllBtn = false;

  nowTodoStatusType = TodoStatusType.All;
  TodoStatusType = TodoStatusType;

  todoInputModel = "";

  date = new Date();

  todoDataList: Todo[] = []

  constructor(private http: HttpClient) {

  }

  ngOnInit(): void {
    this.http.get<Todo[]>("assets/todo.json")
      .subscribe(data => {
        this.todoDataList = data;
      })
  }

  toggleAll() {
    this.toggleAllBtn = !this.toggleAllBtn;
    this.todoDataList.forEach((item) => {
      item.Status = this.toggleAllBtn;
    })
  }

  clickCheck(item: Todo) {
    item.Status = !item.Status;
    if (this.todoCompleted.length === this.todoDataList.length) {
      this.toggleAllBtn = true;
    } else {
      this.toggleAllBtn = false;
    }
  }

  delete(todo: Todo) {
    this.todoDataList = this.todoDataList.filter(data => data !== todo)
  }

  add() {
    const todo: Todo = {
      Status: false,
      Thing: this.todoInputModel,
      Editing: false,
    }
    this.todoDataList.push(todo);
    this.todoInputModel = "";
  }

  edit(item: Todo) {
    item.Editing = true;
  }

  update(item: Todo, value: string) {
    item.Thing = value;
    item.Editing = false;
  }

  setTodoStatusType(type: number) {
    this.nowTodoStatusType = type;
  }

  get nowTodoList(): Todo[] {
    let list: Todo[] = []
    switch (this.nowTodoStatusType) {
      case TodoStatusType.Active:
        list = this.todoActive;
        break;
      case TodoStatusType.Completed:
        list = this.todoCompleted;
        break;
      default:
        list = this.todoDataList
        break;
    }
    return list
  }


  get todoActive(): Todo[] {
    return this.todoDataList.filter(data => !data.Status)
  }

  get todoCompleted(): Todo[] {
    return this.todoDataList.filter(data => data.Status)
  }

  ClearCompleted() {
    this.todoDataList = this.todoActive
  }
}