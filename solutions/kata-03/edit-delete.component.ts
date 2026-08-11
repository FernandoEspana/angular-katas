import { Component } from '@angular/core';

@Component({
  selector: 'app-edit-delete',
  templateUrl: './edit-delete.component.html',
})
export class EditDeleteComponent {
  people: string[] = ['Ada', 'Grace', 'Linus'];
  editingIndex = -1;
  draft = '';

  startEdit(index: number): void {
    this.editingIndex = index;
    this.draft = this.people[index];
  }

  save(): void {
    const value = this.draft.trim();
    if (value) {
      this.people[this.editingIndex] = value;
    }
    this.cancel();
  }

  cancel(): void {
    this.editingIndex = -1;
    this.draft = '';
  }

  remove(index: number): void {
    this.people.splice(index, 1);
    if (this.editingIndex === index) {
      this.cancel();
    }
  }

  trackByIndex(index: number): number {
    return index;
  }
}
