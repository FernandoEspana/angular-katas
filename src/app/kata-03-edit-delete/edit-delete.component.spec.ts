import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { EditDeleteComponent } from './edit-delete.component';

describe('Kata 03 — Edit / delete', () => {
  let fixture: ComponentFixture<EditDeleteComponent>;

  const rows = () => fixture.debugElement.queryAll(By.css('[data-testid="item"]'));
  const names = (): string[] =>
    fixture.debugElement
      .queryAll(By.css('[data-testid="item-name"]'))
      .map((de) => (de.nativeElement.textContent || '').trim());
  const editBtns = () => fixture.debugElement.queryAll(By.css('[data-testid="edit-btn"]'));
  const deleteBtns = () => fixture.debugElement.queryAll(By.css('[data-testid="delete-btn"]'));
  const editInputs = () => fixture.debugElement.queryAll(By.css('[data-testid="edit-input"]'));
  const saveBtn = () => fixture.debugElement.query(By.css('[data-testid="save-btn"]'));
  const cancelBtn = () => fixture.debugElement.query(By.css('[data-testid="cancel-btn"]'));

  const settle = () => {
    fixture.detectChanges();
    tick();
    fixture.detectChanges();
  };

  const click = (de: { nativeElement: HTMLElement }) => {
    de.nativeElement.click();
    settle();
  };

  const typeInEdit = (value: string) => {
    const el = editInputs()[0].nativeElement as HTMLInputElement;
    el.value = value;
    el.dispatchEvent(new Event('input'));
    settle();
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormsModule],
      declarations: [EditDeleteComponent],
    }).compileComponents();
    fixture = TestBed.createComponent(EditDeleteComponent);
    fixture.detectChanges();
  });

  it('renderiza las tres filas iniciales', () => {
    expect(rows().length).toBe(3);
    expect(names()).toEqual(['Ada', 'Grace', 'Linus']);
  });

  it('no muestra inputs de edición al inicio', () => {
    expect(editInputs().length).toBe(0);
  });

  it('elimina la fila correcta', fakeAsync(() => {
    click(deleteBtns()[1]);
    expect(names()).toEqual(['Ada', 'Linus']);
  }));

  it('entra en modo edición solo en la fila pulsada', fakeAsync(() => {
    click(editBtns()[1]);
    expect(editInputs().length).toBe(1);
    expect(names()).toEqual(['Ada', 'Linus']);
  }));

  it('precarga el input con el valor actual', fakeAsync(() => {
    click(editBtns()[1]);
    expect((editInputs()[0].nativeElement as HTMLInputElement).value).toBe('Grace');
  }));

  it('oculta editar y borrar en la fila en edición', fakeAsync(() => {
    click(editBtns()[1]);
    expect(editBtns().length).toBe(2);
    expect(deleteBtns().length).toBe(2);
  }));

  it('guarda el nuevo valor y vuelve a modo lectura', fakeAsync(() => {
    click(editBtns()[1]);
    typeInEdit('Grace Hopper');
    click(saveBtn());
    expect(names()).toEqual(['Ada', 'Grace Hopper', 'Linus']);
    expect(editInputs().length).toBe(0);
  }));

  it('recorta espacios al guardar', fakeAsync(() => {
    click(editBtns()[0]);
    typeInEdit('   Ada Lovelace   ');
    click(saveBtn());
    expect(names()).toEqual(['Ada Lovelace', 'Grace', 'Linus']);
  }));

  it('no guarda un valor vacío', fakeAsync(() => {
    click(editBtns()[0]);
    typeInEdit('    ');
    click(saveBtn());
    expect(names()).toEqual(['Ada', 'Grace', 'Linus']);
    expect(editInputs().length).toBe(0);
  }));

  it('cancela descartando los cambios', fakeAsync(() => {
    click(editBtns()[2]);
    typeInEdit('Torvalds');
    click(cancelBtn());
    expect(names()).toEqual(['Ada', 'Grace', 'Linus']);
    expect(editInputs().length).toBe(0);
  }));

  it('mantiene una sola fila en edición a la vez', fakeAsync(() => {
    click(editBtns()[0]);
    click(editBtns()[0]);
    expect(editInputs().length).toBe(1);
  }));
});
