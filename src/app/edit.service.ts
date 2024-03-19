// export class EditService {
//   public sharedData: any;

//   constructor() {}

//   setData(data: any) {
//     this.sharedData = data;
//   }

//   getData() {
//     return this.sharedData;
//   }
// }

import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable()
export class EditService {
  private sharedDataSubject: BehaviorSubject<any> = new BehaviorSubject<any>(
    null
  );
  public sharedData$: Observable<any> = this.sharedDataSubject.asObservable();

  constructor() {}

  setData(data: any) {
    this.sharedDataSubject.next(data);
  }

  getData(): Observable<any> {
    return this.sharedData$;
  }

  clearData() {
    this.sharedDataSubject.next(null);
  }
}
