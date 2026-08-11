import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { SignupFormComponent } from './signup-form.component';

describe('Kata 06 — Reactive form', () => {
  let fixture: ComponentFixture<SignupFormComponent>;

  const el = (id: string) => fixture.debugElement.query(By.css(`[data-testid="${id}"]`));
  const submitBtn = (): HTMLButtonElement => el('submit-btn').nativeElement;

  const fill = (id: string, value: string) => {
    const input = el(id).nativeElement as HTMLInputElement;
    input.value = value;
    input.dispatchEvent(new Event('input'));
    fixture.detectChanges();
  };

  const touch = (id: string) => {
    (el(id).nativeElement as HTMLInputElement).dispatchEvent(new Event('blur'));
    fixture.detectChanges();
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [SignupFormComponent],
    }).compileComponents();
    fixture = TestBed.createComponent(SignupFormComponent);
    fixture.detectChanges();
  });

  it('crea el formulario con los controles email y password', () => {
    const form = fixture.componentInstance.form;
    expect(form).withContext('form no inicializado').toBeTruthy();
    expect(form.get('email')).not.toBeNull();
    expect(form.get('password')).not.toBeNull();
  });

  it('arranca inválido y con el botón deshabilitado', () => {
    expect(fixture.componentInstance.form.invalid).toBe(true);
    expect(submitBtn().disabled).toBe(true);
  });

  it('no muestra errores antes de tocar los campos', () => {
    expect(el('email-error')).toBeNull();
    expect(el('password-error')).toBeNull();
  });

  it('muestra el error de email tras tocarlo con un valor inválido', () => {
    fill('email', 'no-es-un-email');
    touch('email');
    expect(el('email-error')).not.toBeNull();
    expect((el('email-error').nativeElement.textContent || '').trim()).toBe('Invalid email');
  });

  it('oculta el error de email cuando el valor es válido', () => {
    fill('email', 'no-es-un-email');
    touch('email');
    fill('email', 'fer@example.com');
    expect(el('email-error')).toBeNull();
  });

  it('muestra el error de password con menos de 8 caracteres', () => {
    fill('password', 'corta');
    touch('password');
    expect(el('password-error')).not.toBeNull();
    expect((el('password-error').nativeElement.textContent || '').trim()).toBe(
      'Password too short'
    );
  });

  it('habilita el botón cuando todo es válido', () => {
    fill('email', 'fer@example.com');
    fill('password', 'unaClaveLarga');
    expect(submitBtn().disabled).toBe(false);
  });

  it('no muestra el mensaje de éxito antes de enviar', () => {
    fill('email', 'fer@example.com');
    fill('password', 'unaClaveLarga');
    expect(el('success')).toBeNull();
  });

  it('muestra el mensaje de éxito al enviar un formulario válido', () => {
    fill('email', 'fer@example.com');
    fill('password', 'unaClaveLarga');
    submitBtn().click();
    fixture.detectChanges();
    expect(el('success')).not.toBeNull();
    expect((el('success').nativeElement.textContent || '').trim()).toBe('Welcome');
  });
});
