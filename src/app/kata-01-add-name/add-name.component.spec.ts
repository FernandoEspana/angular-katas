import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { AddNameComponent } from './add-name.component';

describe('Kata 01 — Add name', () => {
  let fixture: ComponentFixture<AddNameComponent>;

  const input = (): HTMLInputElement =>
    fixture.debugElement.query(By.css('[data-testid="name-input"]')).nativeElement;
  const addBtn = (): HTMLButtonElement =>
    fixture.debugElement.query(By.css('[data-testid="add-btn"]')).nativeElement;
  const items = (): string[] =>
    fixture.debugElement
      .queryAll(By.css('[data-testid="name-item"]'))
      .map((de) => (de.nativeElement.textContent || '').trim());

  const type = (value: string) => {
    const el = input();
    el.value = value;
    el.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    tick();
    fixture.detectChanges();
  };

  const add = () => {
    addBtn().click();
    fixture.detectChanges();
    tick();
    fixture.detectChanges();
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormsModule],
      declarations: [AddNameComponent],
    }).compileComponents();
    fixture = TestBed.createComponent(AddNameComponent);
    fixture.detectChanges();
  });

  it('renderiza el input y el botón', () => {
    expect(input()).toBeTruthy();
    expect(addBtn()).toBeTruthy();
  });

  it('arranca sin ningún item en la lista', () => {
    expect(items().length).toBe(0);
  });

  it('agrega un nombre a la lista', fakeAsync(() => {
    type('Ada');
    add();
    expect(items()).toEqual(['Ada']);
  }));

  it('limpia el input después de agregar', fakeAsync(() => {
    type('Ada');
    add();
    expect(input().value).toBe('');
  }));

  it('agrega varios nombres conservando el orden', fakeAsync(() => {
    type('Ada');
    add();
    type('Grace');
    add();
    type('Linus');
    add();
    expect(items()).toEqual(['Ada', 'Grace', 'Linus']);
  }));

  it('recorta los espacios sobrantes', fakeAsync(() => {
    type('   Ada   ');
    add();
    expect(items()).toEqual(['Ada']);
  }));

  it('no agrega cadenas vacías ni solo espacios', fakeAsync(() => {
    type('     ');
    add();
    expect(items().length).toBe(0);
  }));

  it('no agrega duplicados ignorando mayúsculas', fakeAsync(() => {
    type('Ada');
    add();
    type('ADA');
    add();
    type('  ada ');
    add();
    expect(items()).toEqual(['Ada']);
  }));

  it('deshabilita el botón cuando el input está vacío', () => {
    expect(addBtn().disabled).toBe(true);
  });

  it('habilita el botón cuando hay texto válido', fakeAsync(() => {
    type('Ada');
    expect(addBtn().disabled).toBe(false);
  }));

  it('deshabilita el botón cuando el input solo tiene espacios', fakeAsync(() => {
    type('    ');
    expect(addBtn().disabled).toBe(true);
  }));
});
