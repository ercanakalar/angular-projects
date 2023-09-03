import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  constructor() {}

  updateArray(updatedArray: Array<any>): void {
    console.log('updatedArray: ', updatedArray);
  }
}
