import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EmployeeCreateComponent } from './employee/employee-create.component';
import { ListEmployeesComponent } from './employee/list-employees.component';

const routes: Routes = [
  { path: 'list', component: ListEmployeesComponent  },
  { path: 'create', component: EmployeeCreateComponent  },
  { path: 'edit/:id', component: EmployeeCreateComponent  },
  { path: '', redirectTo: '/' , pathMatch: 'full'  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
