import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule  } from '@angular/forms';


// shared modules cant have any any providers,
// we usrer provides to specify services, so if we have multiple providers,
// we may end up creating mutiple instances of services which breaks the rule if angulars singleton service
// here we cannot import/export that have providers.
@NgModule({

  // here we specify any components/pipes/directives that needs to be shared with other feature modules
  declarations: [],
  // we can import "CommonModule" - module, if we have any other components/modules dependent on this
  imports: [],
  // as it is needed in employee.module.ts
  // so we can re-export these modules withot being imported
  // we exported these modules as they are used in employee.module.ts
  exports: [CommonModule, ReactiveFormsModule]
})
export class SharedModule { }
