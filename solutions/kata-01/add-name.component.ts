import { Component } from '@angular/core';

@Component({
  selector: 'app-add-name',
  templateUrl: './add-name.component.html',
})
export class AddNameComponent {
  name = '';
  names: string[] = [];

  addName(): void {
    const value = this.name.trim();
    if (!value) {
      return;
    }
    const exists = this.names.some((n) => n.toLowerCase() === value.toLowerCase());
    if (exists) {
      this.name = '';
      return;
    }
    this.names.push(value);
    this.name = '';
  }

  get isDisabled(): boolean {
    return this.name.trim().length === 0;
  }

  trackByIndex(index: number): number {
    return index;
  }
}
