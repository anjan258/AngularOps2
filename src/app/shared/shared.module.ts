import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule  } from '@angular/forms';



@NgModule({
  declarations: [],
  // we can import "CommonModule" - module, if we have any other components/modules dependent on this
  imports: [],
  // as it is needed in employee.module.ts
  // so we can re-export these modules withot being imported
  // we exported these modules as they are used in employee.module.ts
  exports: [CommonModule, ReactiveFormsModule] 
})
export class SharedModule { }
