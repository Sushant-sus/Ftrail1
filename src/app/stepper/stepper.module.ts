import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditComponent } from './edit/edit.component';
import { RolesComponent } from './roles/roles.component';
import { MaterialModule } from '../material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { MatStepperModule } from '@angular/material/stepper';
import { StepperComponent } from './stepper.component';
import { StepperService } from './stepper.service';



@NgModule({
  declarations: [EditComponent, RolesComponent, StepperComponent],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    MatStepperModule,
  ],
  exports: [EditComponent, RolesComponent],
  providers: [StepperService],
})
export class StepperModule { }
