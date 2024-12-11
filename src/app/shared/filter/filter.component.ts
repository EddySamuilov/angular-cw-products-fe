import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-filter',
  standalone: true,
  imports: [],
  templateUrl: './filter.component.html',
  styleUrl: './filter.component.css'
})
export class FilterComponent {
  @Output() filterItems = new EventEmitter<string>();

  onFilterChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.filterItems.emit(input.value);
  }
}
