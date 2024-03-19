import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ELEMENT_DATA } from '../constants/elements-data';
import { Element } from '../models/elements-model';

@Injectable({
  providedIn: 'root',
})
export class elementsService {
  elements$: BehaviorSubject<Element[]>;
  elements: Array<Element> = [];
  constructor() {
    this.elements$ = new BehaviorSubject([]);
    this.elements = ELEMENT_DATA;
  }

  getAll() {
    this.elements$.next(this.elements);
  }

  add(element: Element) {
    this.elements.push(element);
  }

  edit(element: Element) {
    let findElem = this.elements.find((p) => p.position == element.position);

    findElem.name = element.name;
    findElem.weight = element.weight;
    findElem.symbol = element.symbol;

    this.elements$.next(this.elements);
  }

  remove(id: number) {
    this.elements = this.elements.filter((p) => {
      return p.id != id;
    });

    this.elements$.next(this.elements);
  }
}
