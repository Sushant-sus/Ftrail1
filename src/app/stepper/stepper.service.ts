
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { PeriodicElement } from '../core/models/elements-model';

@Injectable()
export class StepperService {
  private editedDataSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  private selectedDepartmentsMap: { [key: number]: string[] } = {};
  private selectedDepartmentsSubject: BehaviorSubject<{ [key: number]: string[] }> = new BehaviorSubject<{ [key: number]: string[] }>({});

  constructor() { }

  // EditService methods

  setEditedData(data: PeriodicElement | null): void {
    this.editedDataSubject.next(data);
  }

  getEditedData(): Observable<any> {
    return this.editedDataSubject.asObservable();
  }

  // RolesService methods

  setSelectedDepartmentForId(id: any, departments: string[]) {
    this.selectedDepartmentsMap[id] = departments;
    this.selectedDepartmentsSubject.next({ ...this.selectedDepartmentsMap }); // Emit updated map
  }

  getSelectedDepartmentForId(id: any): Observable<string[]> {
    return this.selectedDepartmentsSubject.asObservable().pipe(
      map((selectedDepartmentsMap: { [id: number]: string[] }) => selectedDepartmentsMap[id] || [])
    );
  }

  getSelectedDepartmentsMapObservable(): Observable<{ [key: number]: string[] }> {
    return this.selectedDepartmentsSubject.asObservable();
  }
}
