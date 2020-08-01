import { Injectable } from '@angular/core';
import { IEmployee } from '../employee/iemployee';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { catchError, retry } from 'rxjs/operators';

@Injectable()
export class EmployeeService {

    constructor(private httpClient: HttpClient){}

    baseURL = 'http://localhost:30001/employees';

    getEmployees(): Observable<IEmployee> {
        return this.httpClient.get<IEmployee>(this.baseURL).pipe(retry(1), catchError(this.handleError));
    }

    handleError(error: HttpErrorResponse) {
        let errorMessage = '';
        if (error.error instanceof ErrorEvent) {
            // client-side error
            errorMessage = `Error: ${error.error.message}`;
        } else {
            // server-side error
            errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
        }
        console.log(errorMessage);
        return throwError(errorMessage);
    }

    getEmployeeById(id: number): Observable<IEmployee> {
        return this.httpClient.get<IEmployee>(`${this.baseURL}/${id}`).pipe(retry(1), catchError(this.handleError));
    }

    updateEmployee(emp: IEmployee): Observable<void>{
        return this.httpClient.put<void>(`${this.baseURL}/${emp.id}`, emp, {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            })
        }).pipe(catchError(this.handleError))
    }

    addEmployee(emp: IEmployee): Observable<IEmployee>{
        return this.httpClient.post<IEmployee>(this.baseURL, emp, {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            })
        }).pipe(catchError(this.handleError))
    }
}
