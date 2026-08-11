import { Component } from '@angular/core';

@Component({
  selector: 'app-filter-list',
  templateUrl: './filter-list.component.html',
})
export class FilterListComponent {
  query = '';
  frameworks: string[] = ['Angular', 'React', 'Vue', 'Svelte', 'Ember', 'Backbone'];

  get visible(): string[] {
    const q = this.query.trim().toLowerCase();
    if (!q) {
      return this.frameworks;
    }
    return this.frameworks.filter((f) => f.toLowerCase().includes(q));
  }

  trackByName(_index: number, name: string): string {
    return name;
  }
}
