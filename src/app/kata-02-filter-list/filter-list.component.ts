import { Component } from '@angular/core';

@Component({
  selector: 'app-filter-list',
  templateUrl: './filter-list.component.html',
})
export class FilterListComponent {
  query = '';
  frameworks: string[] = ['Angular', 'React', 'Vue', 'Svelte', 'Ember', 'Backbone'];

  // TODO: devuelve solo los frameworks que coinciden con query.
  get visible(): string[] {
    console.log(this.query);
    const searchNames = (list: string[], criteria: string): string[] => {
      return list.filter(n => n.toLocaleLowerCase().includes(criteria.toLocaleLowerCase()));
    }

    return searchNames(this.frameworks, this.query);
  }
}
