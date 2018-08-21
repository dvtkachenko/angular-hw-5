import { ToastrService } from 'node_modules/ngx-toastr';
import { NgxSpinnerService } from 'node_modules/ngx-spinner';
import { ActivatedRoute, Router } from '@angular/router';
import { Todo } from '../../models/todo.model';
import { Component, OnInit } from '@angular/core';
import { TodosService } from '../../services/todos.service';

@Component({
  selector: 'app-todo-edit',
  templateUrl: './todo-edit.component.html',
  styleUrls: ['./todo-edit.component.css']
})
export class TodoEditComponent implements OnInit {

  todoId: string;
  todo: Todo;
  isReadOnly: boolean = true;

  constructor(private todosService: TodosService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService) { }

  ngOnInit() {

    this.spinner.show();

    this.todoId = this.activatedRoute.snapshot.params['id'];
    this.todosService.getTodo(this.todoId)
      .subscribe((response: Todo) => {
        this.todo = response;
        this.spinner.hide();
      }, error => {
        this.toastr.error("Can not get todo from server", "Error", { timeOut: 3000 });
        this.router.navigate(['/']);
        this.spinner.hide();
      }
      );
  }

  public onEdit(): void {
    this.isReadOnly = false;
  }

  public onSave(): void {

    this.isReadOnly = true;
    this.spinner.show();

    const clonedTodo = Object.assign({}, this.todo);

    this.todosService.updateTodo(clonedTodo)
      .subscribe((response: Todo) => {
        this.todo = response;
        this.toastr.success("Todo was successfully updated", "Info", { timeOut: 3000 });
        this.router.navigate(['/']);
        this.spinner.hide();
      }, error => {
        this.toastr.error("Can not update todo on server", "Error", { timeOut: 3000 });
        this.spinner.hide();
      }
        // in an error case it does not work
        // () => {
        //   this.router.navigate(['/']);
        //   this.spinner.hide();
        // }
      );
  }

  public onCancel(): void {
    this.isReadOnly = true;
    this.router.navigate(['/']);
  }
}
