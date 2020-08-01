import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EmployeeCreateComponent } from './employee-create.component';
import { ListEmployeesComponent } from './list-employees.component';


// for lazy loading to work all the routes in a module should have same prefix
// so for that we do as follows by creating a root path and adding rest of routes are children
// so now the urls will be employees, employees/create and employees/create/2
// also we need to change the routerlink in the app.component.html as (routerLink="employees", routerLink="employees/create")
const routes: Routes = [
    { path: 'employees', children: [

        { path: '', component: ListEmployeesComponent },
        { path: 'create', component: EmployeeCreateComponent },
        { path: 'edit/:id', component: EmployeeCreateComponent }
    ]}
];

// we should use only "forChild()" -- in feature modules (like this module)
// we cant use "forRoot" here to bind routes except in root module routing

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class EmployeeRoutingModule {
}
