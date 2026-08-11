import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { FilterListComponent } from './filter-list.component';

describe('Kata 02 — Filter list', () => {
  let fixture: ComponentFixture<FilterListComponent>;

  const filterInput = (): HTMLInputElement =>
    fixture.debugElement.query(By.css('[data-testid="filter-input"]')).nativeElement;
  const items = (): string[] =>
    fixture.debugElement
      .queryAll(By.css('[data-testid="item"]'))
      .map((de) => (de.nativeElement.textContent || '').trim());
  const emptyMessage = () => fixture.debugElement.query(By.css('[data-testid="empty-message"]'));

  const type = (value: string) => {
    const el = filterInput();
    el.value = value;
    el.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    tick();
    fixture.detectChanges();
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormsModule],
      declarations: [FilterListComponent],
    }).compileComponents();
    fixture = TestBed.createComponent(FilterListComponent);
    fixture.detectChanges();
  });

  it('muestra los 6 elementos al inicio, en orden', () => {
    expect(items()).toEqual(['Angular', 'React', 'Vue', 'Svelte', 'Ember', 'Backbone']);
  });

  it('no muestra el mensaje de vacío cuando hay resultados', () => {
    expect(emptyMessage()).toBeNull();
  });

  it('filtra por coincidencia parcial', fakeAsync(() => {
    type('ue');
    expect(items()).toEqual(['Vue']);
  }));

  it('ignora mayúsculas y minúsculas', fakeAsync(() => {
    type('ANGU');
    expect(items()).toEqual(['Angular']);
  }));

  it('conserva el orden original al filtrar', fakeAsync(() => {
    type('e');
    expect(items()).toEqual(['React', 'Vue', 'Svelte', 'Ember', 'Backbone']);
  }));

  it('muestra el mensaje de vacío cuando nada coincide', fakeAsync(() => {
    type('zzz');
    expect(items().length).toBe(0);
    const msg = emptyMessage();
    expect(msg).not.toBeNull();
    expect((msg.nativeElement.textContent || '').trim()).toBe('No results');
  }));

  it('restaura la lista completa al borrar el filtro', fakeAsync(() => {
    type('zzz');
    type('');
    expect(items().length).toBe(6);
    expect(emptyMessage()).toBeNull();
  }));
});
