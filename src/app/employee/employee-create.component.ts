import { Component, OnInit } from '@angular/core';
// Validators -- for validations
// FormBuilder -- for "Angular Formbuilder" - code
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

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

  // creating instance of FormBuilder for "Angular Formbuilder" - code
  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {

    // we can create form groups and controls either explicitly like shown below
    // or we an uset "Angular Formbuilder" - code
    // this.employeeForm = new FormGroup(
    //   {
    //     fullName: new FormControl(),
    //     email: new FormControl(),

    //     // nested form group
    //     skills: new FormGroup(
    //       {
    //         skillName: new FormControl(),
    //         experienceInYears: new FormControl(),
    //         proficiency: new FormControl()
    //       }
    //     )
    //   }
    // );

    // using "Angular Formbuilder" - code -- we create instnace of Formbuilder in constructor
    // and initiate the instance as follows
    // we us the instance (fb) of (FormBuilder) and invoke group() -- to declare the form group and controls
    // [''] -- setting null/empty as default value, can set to any value if required.
    // for an example we have set a default value like - proficiency: ['beginner']
    // fullName: ['', Validators.required] -- adds required validation
    //  [Validators.required, Validators.maxLength(10)] -- for multiple validations

    this.employeeForm = this.fb.group({
      fullName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(10)]],
      email: [''],
      skills: this.fb.group({
        skillName: [''],
        experienceInYears: [''],
        proficiency: ['beginner']
      })
    });
  }



  onFormSubmit(): void{
    console.log(this.employeeForm.value);
  }

  // setValue()-- used to bind/populate values to the form controls (fields)
  // we can always a service (api) to get the data and populate these form controls
  // setValue() -- we can only populate all the fields, cant be used to bind subset of form controls
  loadData(): void{
    this.employeeForm.setValue({
      fullName: 'Test',
      email: 'test1@test.com',
      skills: {

        skillName: 'C#',
        experienceInYears: 5,
        proficiency: 'beginner'
      }
    });
  }

  // patchValue()-- used to update(all or selected/subset fields/controls)
  updateData(): void{
    this.employeeForm.patchValue({
      fullName: 'Sara',
      email: 'sara@test.com'
    });
  }

  saveData(): void{
    console.log(this.employeeForm.value);
  }

}
