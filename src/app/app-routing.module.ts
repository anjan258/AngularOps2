import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home.component';
import { PageNotFoundComponent } from './page-not-found.component';


// loadChildren: './employee/employee.module#EmployeeModule' to LAZY LOAD employee component
const routes: Routes = [
  { path: 'home', component: HomeComponent  },
  { path: '', redirectTo: '/home' , pathMatch: 'full'  },
  { path: 'employees' ,  loadChildren: './employee/employee.module#EmployeeModule'},
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
