import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ApiService } from './api.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  
  constructor(private apiService: ApiService) {}

  loadUsers() {
    return this.apiService.getPosts(5).subscribe((data) => {
      console.log(data);
      
    });
  }
}
