import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ROLE_DATA } from '../../core/constants/roles-data';
import { PeriodicElement } from '../../core/models/elements-model';
import { MatDialogRef } from '@angular/material/dialog';
import { TableService } from '../../table/table.service';
import { StepperService } from '../stepper.service';

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.css'],
})
export class RolesComponent {
  data: PeriodicElement | any;
  roleData = ROLE_DATA;
  roleForm!: FormGroup;
  selectedDepartments: any = {};
  selectedDepartmentsMap: any;
  

  constructor(
    private dialogRef: MatDialogRef<RolesComponent>,
    private formBuilder: FormBuilder,
    private stepperService: StepperService,
    private tableService: TableService,
  ) {
    console.log('roles',this.roleData);
  }

   ngOnInit(): void {
    this.createForm();
    this.stepperService.getEditedData().subscribe(data => {
    console.log('Received data from EditService:', data); 
    this.data = data;
    this.updateFormWithSelectedDepartments();
    });
  }

  // async ngOnInit(): Promise<void> {
  //   this.createForm();
  //   this.data = await this.stepperService.getEditedData().toPromise();
  //   console.log('Received data from EditService:', this.data); 
  //   this.updateFormWithSelectedDepartments();
  // }

  createForm() {
    const userControls: { [key: string]: any } = {};
    for (const role of this.roleData) {
      userControls[role.user] = this.formBuilder.control(false);
    }
    this.roleForm = this.formBuilder.group(userControls);
  }

  updateFormWithSelectedDepartments() {
    if (this.data && this.data.position) {
      const id = this.data.position;
      this.stepperService.getSelectedDepartmentForId(id).subscribe((selectedDepartments: string[]) => {
        const formValue: { [key: string]: boolean } = {};
        for (const role of this.roleData) {
          formValue[role.user] = selectedDepartments.includes(role.user);
        }
        this.roleForm.setValue(formValue);
      });
    }
  }
  
  onSubmit() {
    const id = this.data?.position;
    const selectedDepartments: string[] = [];
    for (const [key, value] of Object.entries(this.roleForm.value)) {
      if (value) {
        selectedDepartments.push(key);
      }
    }
    this.stepperService.setSelectedDepartmentForId(id, selectedDepartments);
    console.log('selected user for',id ,selectedDepartments);
    this.tableService.setEditedTableData(this.data);
    console.log('Edited data:', this.data);
    this.dialogRef.close();

  }
}
