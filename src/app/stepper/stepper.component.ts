import { Component, EventEmitter } from '@angular/core';
import {  FormGroup } from '@angular/forms';


@Component({
  selector: 'app-stepper',
  templateUrl: './stepper.component.html',
  styleUrls: ['./stepper.component.css']
})
export class StepperComponent {
editForm: FormGroup= new FormGroup({});
editedData: EventEmitter<any> = new EventEmitter<any>(); 
  constructor() { }

  nextStep(stepper: any) {
    console.log('next');
    stepper.next();
  }

  prevStep(stepper: any) {
    stepper.previous();
  }
}
