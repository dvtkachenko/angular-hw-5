import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { TodosService } from '../../services/todos.service';
import { Component, OnInit } from '@angular/core';
import { Todo } from '../../models/todo.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  todos: Todo[];

  constructor(private todosService: TodosService,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService) { }

  ngOnInit() {

    // TODO delete
    console.log("HomeComponent ngOnInit()");

    this.spinner.show();

    this.todosService.getTodos()
      .subscribe((response: Todo[]) => {
        this.todos = response;
        this.spinner.hide()
      }, error => {
        this.toastr.error("Can not get todos from server", "Error", { timeOut: 3000 });
        this.spinner.hide();
      }
      );
  }

  public onDelete(id: number): void {

    this.spinner.show();

    this.todosService.deleteTodo(id)
      .subscribe((response: Object) => {
        this.todos = this.todos.filter(filteredTodoses => filteredTodoses.id != id);
        this.toastr.success("Todo was successfully deleted", "Info", { timeOut: 3000 });
        this.spinner.hide();
      }, error => {
        this.toastr.error("Todo was not deleted", "Error", { timeOut: 3000 });
        this.spinner.hide();
      }
        // in an error case it does not work
        // () => this.spinner.hide()    
      );
  }

}
