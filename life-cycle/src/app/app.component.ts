import { Component } from '@angular/core';
import { ArrayupdaterService } from './services/arrayupdater.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'life-cycle';
  private myArray: Array<any> = [];

  constructor(private arrayUpdaterService: ArrayupdaterService) {}

  moveElement(): void {
    const updatedArray = [...this.myArray];

    this.arrayUpdaterService.updateArrayDuringMovement(updatedArray);
  }
}
