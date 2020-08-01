import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules, NoPreloading } from '@angular/router';
import { HomeComponent } from './home.component';
import { PageNotFoundComponent } from './page-not-found.component';
import { CustomPreloadingService } from './custom-preloading.service';


// loadChildren: './employee/employee.module#EmployeeModule' to LAZY LOAD employee component
//  data: {preload: true} ---to implement custom preloading (LAZY ,loading) only to this (employee) module
// so we use custom(preload) prop in data and set to true indicating that we need to LAZY load this module,
// we can seto false if we dont want any other modules not to LAZY load
// becoz preloadingStrategy: PreloadAllModules-- it preloads/LAZY load all modules be default,
// so we created custom ( custom-preloading.service.ts )
const routes: Routes = [
  { path: 'home', component: HomeComponent  },
  { path: '', redirectTo: '/home' , pathMatch: 'full'  },
  { path: 'employees' ,  loadChildren: './employee/employee.module#EmployeeModule', data: {preload: true}}, // preload- custom property
  { path: '**', component: PageNotFoundComponent },
];


// preloadingStrategy: PreloadAllModules  -- does EAGER LAZY Loading
// which means it loads the all the EAGER loaded modules first and the in the backgroud it loads LAZY LOADED modules.
// so by this we dont have to wait of the components to load when LAZY loading is enabled on the modules
// to turn off either remove it or set to "preloadingStrategy: NoPreloading",
// CustomPreloadingService-- custom preloading service to determine the modules that needs to be LAZY/preloaded
@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: CustomPreloadingService })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
