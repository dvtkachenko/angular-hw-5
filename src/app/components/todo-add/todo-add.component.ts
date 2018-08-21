import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'node_modules/ngx-spinner';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Todo } from '../../models/todo.model';
import { TodosService } from '../../services/todos.service';

@Component({
  selector: 'app-todo-add',
  templateUrl: './todo-add.component.html',
  styleUrls: ['./todo-add.component.css']
})
export class TodoAddComponent implements OnInit {

  todo: Todo;

  constructor(private todosService: TodosService,
    private router: Router,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService) { }

  ngOnInit() {
    this.todo = {
      userId: 1,
      title: '',
      completed: false
    }
  }

  public onAdd(): void {

    this.spinner.show();

    const clonedTodo = Object.assign({}, this.todo);

    this.todosService.createTodo(clonedTodo)
      .subscribe((response: Todo) => {
        this.todo = response;
        this.toastr.success("Todo was successfully created", "Info", { timeOut: 3000 });
        this.router.navigate(['/']);
        this.spinner.hide();
      }, error => {
        this.toastr.error("Can not create todo on server", "Error", { timeOut: 3000 });
        this.spinner.hide();
      });
  }

  public onCancel(): void {
    this.router.navigate(['/']);
  }

}
