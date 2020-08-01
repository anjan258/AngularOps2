import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EmployeeCreateComponent } from './employee-create.component';
import { ListEmployeesComponent } from './list-employees.component';


const routes: Routes = [
    { path: 'list', component: ListEmployeesComponent },
    { path: 'create', component: EmployeeCreateComponent },
    { path: 'edit/:id', component: EmployeeCreateComponent }
];

// we should use only "forChild()" -- in feature modules (like this module)
// we cant use "forRoot" here to bind routes except in root module routing

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class EmployeeRoutingModule {
}
