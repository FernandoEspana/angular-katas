import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { UserCardComponent } from './user-card.component';
import { UserListComponent } from './user-list.component';
import { User } from './user.model';

describe('Kata 04 — Input / Output', () => {
  describe('UserCardComponent (hijo aislado)', () => {
    let fixture: ComponentFixture<UserCardComponent>;
    const user: User = { id: 7, name: 'Ada', role: 'Engineer' };

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        declarations: [UserCardComponent],
      }).compileComponents();
      fixture = TestBed.createComponent(UserCardComponent);
      fixture.componentInstance.user = user;
      fixture.detectChanges();
    });

    const text = (id: string) =>
      (
        fixture.debugElement.query(By.css(`[data-testid="${id}"]`)).nativeElement
          .textContent || ''
      ).trim();

    it('renderiza el nombre recibido por @Input', () => {
      expect(text('user-name')).toBe('Ada');
    });

    it('renderiza el rol recibido por @Input', () => {
      expect(text('user-role')).toBe('Engineer');
    });

    it('emite el usuario completo al pulsar el botón', () => {
      let emitted: User | undefined;
      const output = (fixture.componentInstance as unknown as {
        selected: { subscribe: (fn: (u: User) => void) => void };
      }).selected;
      expect(output).withContext('falta el @Output selected').toBeTruthy();
      output.subscribe((u: User) => (emitted = u));

      fixture.debugElement
        .query(By.css('[data-testid="select-btn"]'))
        .nativeElement.click();
      fixture.detectChanges();

      expect(emitted).toEqual(user);
    });
  });

  describe('UserListComponent (padre + hijo)', () => {
    let fixture: ComponentFixture<UserListComponent>;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        declarations: [UserListComponent, UserCardComponent],
      }).compileComponents();
      fixture = TestBed.createComponent(UserListComponent);
      fixture.detectChanges();
    });

    const cards = () => fixture.debugElement.queryAll(By.css('app-user-card'));
    const selectBtns = () =>
      fixture.debugElement.queryAll(By.css('[data-testid="select-btn"]'));
    const selectedName = () =>
      fixture.debugElement.query(By.css('[data-testid="selected-name"]'));

    const click = (index: number) => {
      selectBtns()[index].nativeElement.click();
      fixture.detectChanges();
    };

    it('renderiza una tarjeta por usuario', () => {
      expect(cards().length).toBe(3);
    });

    it('pasa los datos correctos a cada tarjeta', () => {
      const rendered = fixture.debugElement
        .queryAll(By.css('[data-testid="user-name"]'))
        .map((de) => (de.nativeElement.textContent || '').trim());
      expect(rendered).toEqual(['Ada', 'Grace', 'Linus']);
    });

    it('no muestra selección antes de pulsar nada', () => {
      expect(selectedName()).toBeNull();
    });

    it('muestra el nombre del usuario seleccionado', () => {
      click(1);
      expect(selectedName()).not.toBeNull();
      expect((selectedName().nativeElement.textContent || '').trim()).toContain('Grace');
    });

    it('reemplaza la selección al elegir otro usuario', () => {
      click(1);
      click(2);
      const txt = (selectedName().nativeElement.textContent || '').trim();
      expect(txt).toContain('Linus');
      expect(txt).not.toContain('Grace');
    });
  });
});
