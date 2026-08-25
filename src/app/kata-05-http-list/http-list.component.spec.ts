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
      {
        id: 1,
        username: 'ada',
        about: 'Engineer',
        submitted: 1500000000,
        updated_at: 1500000000,
        submission_count: 3,
        comment_count: 1,
        created_at: 1400000000,
      },
      {
        id: 2,
        username: 'grace',
        about: 'Admiral',
        submitted: 1500000001,
        updated_at: 1500000001,
        submission_count: 5,
        comment_count: 2,
        created_at: 1400000001,
      },
      {
        id: 3,
        username: 'linus',
        about: 'Architect',
        submitted: 1500000002,
        updated_at: 1500000002,
        submission_count: 7,
        comment_count: 4,
        created_at: 1400000002,
      },
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
    console.log('el request->', req);
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
    expect(rows()).toEqual(['ada', 'grace', 'linus']);
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
