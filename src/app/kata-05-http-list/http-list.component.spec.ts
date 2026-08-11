import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { By } from '@angular/platform-browser';
import { HttpListComponent } from './http-list.component';
import { USERS_URL } from './users.service';

describe('Kata 05 — HttpClient', () => {
  let fixture: ComponentFixture<HttpListComponent>;
  let httpMock: HttpTestingController;

  const envelope = {
    page: 1,
    per_page: 10,
    total: 3,
    total_pages: 1,
    data: [
      { id: 1, name: 'Ada', role: 'Engineer' },
      { id: 2, name: 'Grace', role: 'Admiral' },
      { id: 3, name: 'Linus', role: 'Architect' },
    ],
  };

  const loading = () => fixture.debugElement.query(By.css('[data-testid="loading"]'));
  const error = () => fixture.debugElement.query(By.css('[data-testid="error"]'));
  const rows = (): string[] =>
    fixture.debugElement
      .queryAll(By.css('[data-testid="row"]'))
      .map((de) => (de.nativeElement.textContent || '').trim());

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [HttpListComponent],
    }).compileComponents();
    fixture = TestBed.createComponent(HttpListComponent);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => httpMock.verify());

  it('hace un GET a la URL correcta al inicializar', () => {
    fixture.detectChanges();
    const req = httpMock.expectOne(USERS_URL);
    expect(req.request.method).toBe('GET');
    req.flush(envelope);
  });

  it('muestra el indicador de carga mientras la petición está pendiente', () => {
    fixture.detectChanges();
    expect(loading()).not.toBeNull();
    expect(rows().length).toBe(0);
    httpMock.expectOne(USERS_URL).flush(envelope);
  });

  it('renderiza una fila por usuario al responder', () => {
    fixture.detectChanges();
    httpMock.expectOne(USERS_URL).flush(envelope);
    fixture.detectChanges();
    expect(rows()).toEqual(['Ada', 'Grace', 'Linus']);
  });

  it('oculta el indicador de carga tras la respuesta', () => {
    fixture.detectChanges();
    httpMock.expectOne(USERS_URL).flush(envelope);
    fixture.detectChanges();
    expect(loading()).toBeNull();
    expect(error()).toBeNull();
  });

  it('muestra el mensaje de error si la petición falla', () => {
    fixture.detectChanges();
    httpMock
      .expectOne(USERS_URL)
      .flush('boom', { status: 500, statusText: 'Server Error' });
    fixture.detectChanges();

    expect(loading()).toBeNull();
    expect(rows().length).toBe(0);
    expect(error()).not.toBeNull();
    expect((error().nativeElement.textContent || '').trim()).toBe('Something went wrong');
  });
});
