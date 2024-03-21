import { Component, EventEmitter, Inject, Output, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { PeriodicElement } from '../../core/models/elements-model';
import { Subscription } from 'rxjs';
import { StepperService } from '../stepper.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css'],
})
export class EditComponent implements OnInit {
  // editedData: any;
  editForm!: FormGroup;
  currentStep = 1;
  private dataSubscription?: Subscription;

  // @Output() editedData: EventEmitter<PeriodicElement> =
  //   new EventEmitter<PeriodicElement>();

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private stepperService: StepperService,
    private formBuilder: FormBuilder,
  ) {
    console.log('editcomponent', data);
  }

  ngOnInit() {
    this.createForm();
   
  }

  createForm() {
    this.editForm = this.formBuilder.group({
      position: [this.data.position, Validators.required],
      name: [this.data.name, Validators.required],
      weight: [this.data.weight, Validators.required],
      symbol: [this.data.symbol, Validators.required],
    });
  }

  onNext() {
    const editedData: PeriodicElement = this.editForm.value;
    this.stepperService.setEditedData(editedData);
    console.log('edited data sent to services',editedData);
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
