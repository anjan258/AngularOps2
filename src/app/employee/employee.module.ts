import { NgModule } from '@angular/core';
import { EmployeeCreateComponent } from './employee-create.component';
import { ListEmployeesComponent } from './list-employees.component';
import { HttpClientModule } from '@angular/common/http';
import { EmployeeRoutingModule  } from './employee-routing.module';
import { SharedModule } from '../shared/shared.module';


// to make this module (or any),"Lazy loaded" we should make sure that the mdoule is not referenced in any other module
// and also the route prefix of all the url in the module should be same.
@NgModule({
  declarations: [
    EmployeeCreateComponent,
    ListEmployeesComponent,
  ],
  imports: [
    HttpClientModule,
    EmployeeRoutingModule,
    SharedModule
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
