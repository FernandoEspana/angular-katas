import { Component } from '@angular/core';

@Component({
  selector: 'app-edit-delete',
  templateUrl: './edit-delete.component.html',
})
export class EditDeleteComponent {
  people: string[] = ['Ada', 'Grace', 'Linus', 'Steve', 'Wosniak'];
  editingIndex = -1;
  draft = '';

  // TODO
  startEdit(index: number): void {
    this.editingIndex = index;
    this.draft = this.people[index];
  }

  // TODO
  save(): void {
    console.log(this.editingIndex);
    if(this.draft.trim() !== '') {
      this.people[this.editingIndex] = this.draft;
    }
    this.editingIndex = -1;
  }

  // TODO
  cancel(): void {
    this.editingIndex = -1;
  }

  // TODO
  remove(index: number): void {
    this.people.splice(index,1);
  }
}
