import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EmployeeCreateComponent } from './employee/employee-create.component';
import { ListEmployeesComponent } from './employee/list-employees.component';
import { HomeComponent } from './home.component';
import { PageNotFoundComponent } from './page-not-found.component';

const routes: Routes = [
  { path: 'list', component: ListEmployeesComponent  },
  { path: 'create', component: EmployeeCreateComponent  },
  { path: 'edit/:id', component: EmployeeCreateComponent  },
  { path: 'home', component: HomeComponent  },
  { path: '', redirectTo: '/home' , pathMatch: 'full'  },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
