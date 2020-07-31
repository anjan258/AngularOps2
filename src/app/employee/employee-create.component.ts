import { Component, OnInit } from '@angular/core';
// Validators -- for validations
// FormBuilder -- for "Angular Formbuilder" - code
import { FormGroup, FormBuilder, Validators, AbstractControl, FormArray, FormControl } from '@angular/forms';
import { CustomValidators } from '../shared/custom.validators';

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
  fullNameLength: number;


  // holds the error message for form controls if any errors.
  formErrors = {
    fullName: '',
    phone: '',
    email: '',
    confirmEmail: '',
    emailGroup: '',
    skillName: '',
    experienceInYears: '',
    proficiency: ''
  };

  // custom errror messages
  // migrated error messages to components instead of validating in view templates.

  validationMessages = {
    fullName: {
      required: 'Full Name is required.',
      minlength: 'Full Name must be greater than 2 characters.',
      maxlength: 'Full Name must be less than 10 characters.',
    },
    email: {
      required: 'Email is required.',
      emailDomain: 'Email domain should be angular.com.'  // "emailDomain" - the key returing from custom validation
    },
    confirmEmail: {
      required: 'Confirm Email is required.'
    },
    // emailMismatch -- value returing from custom validation,
    // so the error messages are tied to this and so we created "emailGroup"  to hold the error messages.
    emailGroup: {
      emailMismatch: 'Email and Confirm Email dont match.'
    },
    phone: {
      required: 'Phone is required.',
      maxlength: 'Phone must not be less than 10 digits.',
    },
    skillName: {
      required: 'Skill Name is required.',
    },
    experienceInYears: {
      required: 'Experience is required.',
    },
    proficiency: {
      required: 'Proficiency is required.',
    },
  };

  // creating instance of FormBuilder for "Angular Formbuilder" - code
  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {

    // we can create form groups and controls either explicitly like shown below
    // or we an use "Angular Formbuilder" - code
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
    // [Validators.required, Validators.maxLength(10)] -- for multiple validations

    this.employeeForm = this.fb.group({
      fullName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(10)]],
      contactpreference: ['email'],
      // grouping emails, so that email and confirm eamil can be validated
      // as we can validate only on control with "Validators", so we created a form group to validate multiple controls
      emailGroup: this.fb.group({
        // custom validation -- "validatEmailDomain"
        email: ['', [Validators.required, CustomValidators.validateEmailDomain('angular.com')]],
        confirmEmail: ['', [Validators.required]],
      }, { validator: validateMatchEmails }), // validator-- can be any(its just a key).validateMatchEmails-- custom func.
      phone: [''],
      skills: this.fb.group({
        skillName: ['', Validators.required],
        experienceInYears: ['', Validators.required],
        proficiency: ['', Validators.required]
      })
    });


    // to subscribe/track the changes of any form control
    // this.employeeForm.get('fullName').valueChanges.subscribe((value: string) => {
    //   this.fullNameLength = value.length;
    // });

    // to subscribe/track the changes of any form group
    // invoking validations whenevere there are any changes made to the form controls
    // so , we can track changes to any from control as follows
    this.employeeForm.valueChanges.subscribe((data) => {
      this.logValidationErrors(this.employeeForm);
    });

    // to subscribe/track the changes of any nested/subset form group
    // 'skills' -- sub/nested group in employeeForm - group
    // this.employeeForm.get('skills').valueChanges.subscribe((value: string) => {
    //   console.log(JSON.stringify(value));
    // });

    // to track the changes of "ContactPreference" - radio button instead ow writing click event in template
    // we write as follows
    this.employeeForm.get('contactpreference').valueChanges.subscribe((data: string) => {
      this.onContactPreferenceChange(data);
    });
  }

  // loop through all the form controls in form group
  logKeyValueFormGroupPairs(grp: FormGroup): void {
    console.log(Object.keys(grp.controls));
  }

  // loop through all the form controls in form group and nested groups and controls
  // abstractControl.disable(); // to disable to all form controls
  // abstractControl.markAllAsTouched(); //  marks all controls as touched
  // abstractControl.markAsDirty();
  // abstractControl.markAsPending();
  // abstractControl.markAsPristine();
  // abstractControl.markAsUntouched();
  logKeyValueFormGroupAndNestedGroupPairs(grp: FormGroup): void {
    Object.keys(grp.controls).forEach((key: string) => {

      const abstractControl = grp.get(key);
      if (abstractControl instanceof FormGroup) {
        // recursive calling to loop through control if instacne is FormGroup
        this.logKeyValueFormGroupAndNestedGroupPairs(abstractControl);
      }
      else {
        // else log all the key value pairs of form controls
        console.log('Key =' + key + ' Value =' + abstractControl.value);
      }
    });
  }


  // we loop through all the form groups and form controls,
  // check the if any validation errors and assign the validation error message from "validationMessages" --array
  // and then assign the respective error message to the "formsError" -- name by matching the control name
  // for an example, if we have a required field validation for FullName, we get the error message from "validationMessages" --array
  // and then assign message to teh fullName varaible in "formsError"  -- array
  logValidationErrors(grp: FormGroup = this.employeeForm): void {
    Object.keys(grp.controls).forEach((key: string) => {

      const abstractControl = grp.get(key);
      this.formErrors[key] = ' ';
      if (abstractControl && !abstractControl.valid && (abstractControl.touched || abstractControl.dirty)) {
        const msg = this.validationMessages[key];

        for (const errorKey in abstractControl.errors) {
          if (errorKey) {
            this.formErrors[key] += msg[errorKey] + ' ';
          }
        }
      }

      if (abstractControl instanceof FormGroup) {
        this.logValidationErrors(abstractControl);
      }
      else {

      }
    });
  }

  onFormSubmit(): void {
    console.log(this.employeeForm.value);
  }

  // setValue()-- used to bind/populate values to the form controls (fields)
  // we can always a service (api) to get the data and populate these form controls
  // setValue() -- we can only populate all the fields, cant be used to bind subset of form controls
  loadData(): void {
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
  updateData(): void {
    this.employeeForm.patchValue({
      fullName: 'Sara',
      email: 'sara@test.com'
    });
  }

  // "FormArray" -- just like FormControl and FormGroup, its a collection of formcontrol, formgroup and also formarray
  // as you can see in the following example.
  getAllFormControlsAndGroups(): void {

    // creating "FormArray" with "new" -  keyword
    // const formArray = new FormArray([
    //   new FormControl('Test', Validators.required),
    //   new FormGroup({
    //     country: new FormControl('', Validators.required)
    //   }),
    //   new FormArray([])
    // ]);


    // another way of creating "FormArray" is suing "array()" of the FormBuilder - class
    // we add any type of control to "FormArray"
    // we can also push,insert into "FormArray"
    // we also have removeAt(), setControl(),at() methods too
    const formArray = this.fb.array([
      new FormControl('TestA', Validators.required),
      new FormGroup({
        country: new FormControl('', Validators.required)
      }),
      new FormArray([])
    ]);


    // formArray and formArray1 -- are identical in many ways
    // byt the one major diff is - formArray returns data in array while formArray1 in object form
    // here when i say formArray is (this.fb.array) and formArray1 is (this.fb.group)

    const formArray2 = this.fb.group([
      new FormControl('TestA', Validators.required),
      new FormGroup({
        country: new FormControl('', Validators.required)
      }),
      new FormArray([])
    ]);

    // example of push() method in "FormArray"
    formArray.push(new FormControl('TestB', Validators.required));

    console.log(formArray.value);

// looping through FormArray to find if the type (FormControl, FormGroup, FormArray) of control
    for (const ctrl of formArray.controls) {
      if (ctrl instanceof FormControl) {
        console.log('Its FormControl:', ctrl.value);
      }
      if (ctrl instanceof FormGroup) {
        console.log('Its FormGroup:', ctrl.value);
      }
      if (ctrl instanceof FormArray) {
        console.log('Its FormArray:', ctrl.value);
      }
    }
  }

  saveData(): void {
    // this.logKeyValueFormGroupPairs(this.employeeForm);
    // this.logValidationErrors(this.employeeForm);
    // console.log(this.formErrors);
    // this.logKeyValueFormGroupAndNestedGroupPairs(this.employeeForm);
    // console.log(this.employeeForm.value);
  }

  // on change to contact preference, we are dynamically adding validations
  onContactPreferenceChange(selectedVal: string): void {
    const phoneControl = this.employeeForm.get('phone'); // to get phone control
    if (selectedVal === 'phone') {
      phoneControl.setValidators([Validators.required, Validators.maxLength(10)]); // setting validation dynamically
    }
    else {
      phoneControl.clearValidators(); // clear validations
    }

    phoneControl.updateValueAndValidity(); // to update the dynamically set/clear validations
  }
}


// function to check if email and confirm email are matching
// the type of this method is "group: AbstractControl" -- becase we are validating multiple controls withing a formr group
function validateMatchEmails(group: AbstractControl): { [key: string]: any } | null {

  const emailControl = group.get('email');
  const confirmEmailControl = group.get('confirmEmail');
  if (emailControl.value === confirmEmailControl.value || confirmEmailControl.pristine) // confirmEmailControl.pristine)-- not touched
  {
    return null;
  }
  else {
    return { emailMismatch: true };
  }
}
