import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../services/employee.service';
import { IEmployee } from '../employee/iemployee';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-employees',
  templateUrl: './list-employees.component.html',
  styleUrls: ['./list-employees.component.css']
})
export class ListEmployeesComponent implements OnInit {

  listEmployees: IEmployee;
  constructor(private empService: EmployeeService, private router: Router ) { }

  ngOnInit(): void {

    this.empService.getEmployees().subscribe((data) => {
      this.listEmployees = data;
      // console.log(this.listEmployees);
    },
      (err) => console.log(err)
    );
  }

  editEmployee(empId: number): void{
    this.router.navigate(['/edit', empId]);
  }

}
