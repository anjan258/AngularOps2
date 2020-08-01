import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployeeCreateComponent } from './employee-create.component';
import { ListEmployeesComponent } from './list-employees.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { EmployeeRoutingModule  } from './employee-routing.module';


@NgModule({
  declarations: [
    EmployeeCreateComponent,
    ListEmployeesComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    EmployeeRoutingModule
  ],
  // as the components of employee are moved to employee-module
  // so there will be accessible in the employee module,
  // in order to be available or access these componente outside employee module, we need to export like below
  // so now these componenet can be accessed when EmployeeModule - is imported in other  modules
  // exports: [
  //   ListEmployeesComponent,
  //   EmployeeCreateComponent
  // ]
})
export class EmployeeModule { }
