import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-employee-create',
  templateUrl: './employee-create.component.html',
  styleUrls: ['./employee-create.component.css']
})
export class EmployeeCreateComponent implements OnInit {

  // This is called reactive angular forms.
  // its a collection of controls ( FormControl ) within a form group ( FormGroup )
  // also called model-driven forms
  // we need to import "ReactiveFormsModule" -- in app-module.ts in order to these forms to work

  employeeForm: FormGroup;
  constructor() { }

  ngOnInit(): void {
    this.employeeForm = new FormGroup(
      {
        fullName: new FormControl(),
        email: new FormControl()
      }
    );
  }

  onFormSubmit(): void{
    console.log(this.employeeForm.value);
  }

}
