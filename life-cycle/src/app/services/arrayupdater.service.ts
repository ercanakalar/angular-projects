import { Injectable } from '@angular/core';
import { Subject, debounceTime } from 'rxjs';
import { DataService } from './data.service';

@Injectable({
  providedIn: 'root',
})
export class ArrayupdaterService {
  private arrayUpdatedSubject = new Subject<Array<any>>();

  constructor(private dataService: DataService) {
    this.arrayUpdatedSubject.pipe(debounceTime(500)).subscribe((array) => {
      this.sendUpdatedArrayToService(array);
    });
  }

  updateArrayDuringMovement(updatedArray: Array<any>): void {
    this.arrayUpdatedSubject.next(updatedArray);
  }

  sendUpdatedArrayToService(updatedArray: Array<any>): void {
    this.dataService.updateArray(updatedArray);
  }
}
