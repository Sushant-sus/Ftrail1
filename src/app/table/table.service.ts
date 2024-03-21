import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { PeriodicElement } from '../core/models/elements-model';
import { ELEMENT_DATA } from '../core/constants/elements-data';

@Injectable(
  {
    providedIn: 'root' 
  }
)
export class TableService {

  private editedTableData: BehaviorSubject<any> = new BehaviorSubject<any>(null);


  constructor() { }

  setEditedTableData(data: PeriodicElement | null): void {
    if (data) {
      const index = ELEMENT_DATA.findIndex(element => element.position === data.position);
      if (index !== -1) {  
      ELEMENT_DATA[index] = data;
      this.editedTableData.next([...ELEMENT_DATA]);
    }
  }
}
  
  getEditedTableData(): Observable<any> {
    return this.editedTableData.asObservable();
  }
}
