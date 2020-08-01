import { Injectable } from '@angular/core';
import { PreloadingStrategy, Route } from '@angular/router';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})


// check the 'preload' from 'app-routing.module.ts' module and determines 
// whether to preload/LAZY load that speciffic module
export class CustomPreloadingService implements PreloadingStrategy {

  constructor() { }
  preload(route: Route, fn: () => import('rxjs').Observable<any>): Observable<any> {
        if(route.data && route.data.preload){
          return fn();
        }
        else{
          return of(null);
        }
  }
}
