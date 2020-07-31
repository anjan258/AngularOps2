import { AbstractControl } from '@angular/forms';

export class CustomValidators {

    // custom validation function to validate email domain
    // if domain matches retun null or error and so the return type is -- { [key: string]: any } | null

    // created a generic custom validator so that email can removed as hard coded and can be passed from calling function
    // so here we are calling a function inside a function and now "emailArg" will be passed as paramenter to  validate email domain.
    static validateEmailDomain(emailArg: string): { [key: string]: any } | null {
    return (control: AbstractControl): { [key: string]: any } | null => {

      const email: string = control.value;
      const domain = email.substring(email.lastIndexOf('@') + 1);
      // email === '' || so that email required error message doesnot show on domain validation
      if (email === '' || domain.toLocaleLowerCase() === emailArg.toLocaleLowerCase()) {
        return null;
      }
      else {
        return { emailDomain: true }; // returning some string and true to indicate that the validation failed
      }
    };
  }

}
