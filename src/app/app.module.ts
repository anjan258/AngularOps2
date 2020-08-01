import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { EmployeeModule } from './employee/employee.module';

import { EmployeeService } from './services/employee.service';

import { AppComponent } from './app.component';
import { HomeComponent } from './home.component';
import { PageNotFoundComponent } from './page-not-found.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    PageNotFoundComponent
  ],
  // the order of registering the modules should be in order
  // in other words, since now we have separated EmployeeModule, which has seperated routing module(employee-routing.module)
  // we need register EmployeeModule first and then AppRoutingModule, because we have sepcifice routes first ,
  // so when we navigate through links, it matches the routes and redirects the users to appropriate page,
  // but if we register AppRoutingModule module first , it has patter matching(wild card) routes, so it will always show page not found
  imports: [
    BrowserModule,
    HttpClientModule,
    EmployeeModule,
    AppRoutingModule,
  ],
  providers: [EmployeeService],
  bootstrap: [AppComponent]
})
export class AppModule { }
