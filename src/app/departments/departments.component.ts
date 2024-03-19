import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-departments',
  templateUrl: './departments.component.html',
})
export class DepartmentsComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public selectedDepartments: any) {
    console.log('Department', selectedDepartments);
  }
}
