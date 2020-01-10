import { Component, OnInit } from '@angular/core';
import { TodoDataService } from '../service/data/todo-data.service';
import { Router } from '@angular/router';

export class Todo {
  constructor(
    public id: number,
    public description: string,
    public completed: boolean,
    public targetDate: Date) {}
}

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})


export class ListComponent implements OnInit {
  
  todos: Todo[]

  message: string

  // todos = [
  //   new Todo(1, 'clean', false, new Date()),
  //   new Todo(2, 'fold clothes', false, new Date())
  // ]
  
  constructor(private todoService: TodoDataService, private router: Router) { }

  ngOnInit() {
    this.refreshTodo();
  }

  refreshTodo(){
    this.todoService.getAllTodos('chatyra').subscribe(response => {
      console.log(response);
      this.todos = response;
  })

}

  deleteTodo(id){
    console.log(`deleted ${id}`)
    this.todoService.deleteTodo('chatyra', id).subscribe(
      response => {
        console.log(response);
        this.message= `Deleted todo ${id}`
        this.refreshTodo();
      })

    }

    updateTodo(id){
      this.router.navigate(['todos', id]);
    }
    addTodo(){
      this.router.navigate(['todos', -1])
    }
}
