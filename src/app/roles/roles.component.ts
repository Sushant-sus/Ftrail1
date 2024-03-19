import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';
import { PeriodicRole } from '../core/models/roles-model';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DepartmentsComponent } from '../departments/departments.component';
import { ROLE_DATA } from '../core/constants/roles-data';
import { EditComponent } from '../edit/edit.component';
import { EditService } from '../edit.service';
import { ELEMENT_DATA } from '../core/constants/elements-data';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.css'],
})
export class RolesComponent implements OnInit, OnDestroy {
  roleData: PeriodicRole[];
  roleForm!: FormGroup;
  selectedDepartments: string[] = [];
  private sharedDataSubscription?: Subscription;
  private sharedData$?: Observable<any>;
  private sharedData: any;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<RolesComponent>,
    private formBuilder: FormBuilder,
    private dialog: MatDialog,
    private editService: EditService
  ) {
    this.createForm();
    this.roleData = data.roleData;
    console.log(data);
  }

  ngOnInit() {
    // Subscribe to shared data only once
    this.sharedDataSubscription = this.editService
      .getData()
      .subscribe((sharedData) => {
        console.log('Shared data received in RolesComponent:', sharedData);
      });
  }

  ngOnDestroy() {
    if (this.sharedDataSubscription) {
      this.sharedDataSubscription.unsubscribe();
    }
  }

  createForm() {
    const userControls: { [key: string]: any } = {};
    if (this.data && this.data.roleData) {
      for (const role of this.data.roleData) {
        userControls[role.user] = this.formBuilder.control(false);
      }
    }
    this.roleForm = this.formBuilder.group(userControls);
  }

  prevStep() {
    if (this.sharedDataSubscription) {
      this.sharedDataSubscription.unsubscribe();
    }

    this.sharedDataSubscription = this.editService
      .getData()
      .subscribe((sharedData) => {
        const dialogRef = this.dialog.open(EditComponent, {
          width: '600px',
          data: {
            editedData: sharedData || ELEMENT_DATA,
          },
        });
      });
    // this.dialogRef.afterClosed().subscribe(() => {
    //   this.ngOnDestroy();
    // });
    this.dialogRef.close();
  }

  onSubmit() {
    this.selectedDepartments = [];
    Object.keys(this.roleForm.controls).forEach((key) => {
      if (this.roleForm.controls[key].value) {
        this.selectedDepartments.push(key);
      }
    });
    // this.dialogRef.afterClosed().subscribe(() => {
    //   this.ngOnDestroy();
    // });
    this.dialogRef.close();
    console.log('Selected Departments:', this.selectedDepartments);
  }

  onView() {
    const dialogRef = this.dialog.open(DepartmentsComponent, {
      width: '600px',
      data: this.selectedDepartments,
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
    });
  }
}
