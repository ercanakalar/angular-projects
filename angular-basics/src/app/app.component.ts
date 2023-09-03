import { Component } from '@angular/core';
import { HomeComponent } from './home/home.component';
import { RouterLink, RouterModule, RouterOutlet } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-root',
  imports: [HomeComponent, RouterModule, RouterLink, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'first-app';
}
