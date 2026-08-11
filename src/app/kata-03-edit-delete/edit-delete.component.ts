import { Component } from '@angular/core';

@Component({
  selector: 'app-edit-delete',
  templateUrl: './edit-delete.component.html',
})
export class EditDeleteComponent {
  people: string[] = ['Ada', 'Grace', 'Linus'];
  editingIndex = -1;
  draft = '';

  // TODO
  startEdit(index: number): void {}

  // TODO
  save(): void {}

  // TODO
  cancel(): void {}

  // TODO
  remove(index: number): void {}
}
