import { Component, EventEmitter, Inject, Output, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';
import { PeriodicElement } from '../core/models/elements-model';
import { EditService } from '../edit.service';
import { ROLE_DATA } from '../core/constants/roles-data';
import { RolesComponent } from '../roles/roles.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css'],
})
export class EditComponent implements OnInit {
  editForm!: FormGroup;
  currentStep = 1;
  private dataSubscription?: Subscription;

  @Output() editedData: EventEmitter<PeriodicElement> =
    new EventEmitter<PeriodicElement>();

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<EditComponent>,
    private dialog: MatDialog,
    private formBuilder: FormBuilder,
    private editService: EditService
  ) {
    console.log('editcomponent', data);
  }

  ngOnInit() {
    this.createForm();
    this.dataSubscription = this.editService
      .getData()
      .subscribe((sharedData) => {
        this.editForm.patchValue(sharedData);
      });
  }

  ngOnDestroy() {
    if (this.dataSubscription) {
      this.dataSubscription.unsubscribe();
    }
  }

  createForm() {
    this.editForm = this.formBuilder.group({
      position: [this.data.position, Validators.required],
      name: [this.data.name, Validators.required],
      weight: [this.data.weight, Validators.required],
      symbol: [this.data.symbol, Validators.required],
    });
  }

  nextStep() {
    if (this.currentStep === 1) {
      this.editService.setData(this.editForm.value);
      const dialogRef = this.dialog.open(RolesComponent, {
        width: '600px',
        data: { roleData: ROLE_DATA },
      });
    }
    this.dialogRef.close();
  }
}

//   onSubmit() {
//     if (this.currentStep === 2) {
//       this.editService.setData(this.editForm.value);
//       this.editedData.emit(this.editForm.value);
//     } else {
//       this.nextStep();
//     }
//     this.dialogRef.close(this.editForm.value);
//   }
// }

// import { Component, EventEmitter, Inject, Output } from '@angular/core';
// import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import {
//   MAT_DIALOG_DATA,
//   MatDialogRef,
//   MatDialog,
// } from '@angular/material/dialog';
// import { PeriodicElement } from '../core/models/elements-model';
// import { RolesComponent } from '../roles/roles.component';
// import { ROLE_DATA } from '../core/constants/roles-data';
// import { EditService } from '../edit.service';

// @Component({
//   selector: 'app-edit',
//   templateUrl: './edit.component.html',
//   styleUrls: ['./edit.component.css'],
// })
// export class EditComponent {
//   editForm!: FormGroup;
//   currentStep = 1;

//   @Output() editedData: EventEmitter<PeriodicElement> =
//     new EventEmitter<PeriodicElement>();

//   constructor(
//     @Inject(MAT_DIALOG_DATA) public data: any,
//     private dialogRef: MatDialogRef<EditComponent>,
//     private formBuilder: FormBuilder,
//     private dialog: MatDialog,
//     private editService: EditService
//   ) {
//     this.createForm();
//     console.log('editcomponent', data);
//     this.editService.setData(data.editedData);
//     const editedData = this.editService.getData();
//     if (editedData) {
//       this.editForm.patchValue(editedData);
//     }
//   }

//   createForm() {
//     this.editForm = this.formBuilder.group({
//       position: [this.data.position, Validators.required],
//       name: [this.data.name, Validators.required],
//       weight: [this.data.weight, Validators.required],
//       symbol: [this.data.symbol, Validators.required],
//     });
//   }

// nextStep() {
//   if (this.currentStep === 1) {
//     this.editService.setData(this.editForm.value);
//     const dialogRef = this.dialog.open(RolesComponent, {
//       width: '600px',
//       data: { roleData: ROLE_DATA },
//     });
//   }
// }

//   onSubmit() {
//     if (this.currentStep === 2) {
//       this.editService.setData(this.editForm.value);
//       this.editedData.emit(this.editForm.value);
//     } else {
//       this.nextStep();
//     }
//     this.dialogRef.close(this.editForm.value);
//   }
// }
