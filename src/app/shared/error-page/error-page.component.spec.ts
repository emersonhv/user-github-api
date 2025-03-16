import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ErrorPageComponent } from '@app/shared/error-page/error-page.component';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

describe('ErrorPageComponent', () => {
  let component: ErrorPageComponent;
  let fixture: ComponentFixture<ErrorPageComponent>;

  const mockActivatedRoute = {
    queryParams: of({
      message: 'Este es un mensaje de error personalizado',
    }),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ErrorPageComponent],
      providers: [
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ErrorPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges(); 
  });

  it('debería crear el componente correctamente', () => {
    expect(component).toBeTruthy();
  });

  it('debería mostrar el mensaje de error por defecto si no se proporciona un mensaje en los queryParams', () => {
    
    mockActivatedRoute.queryParams = of({ message: '' });
    fixture = TestBed.createComponent(ErrorPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    const errorMessageElement = fixture.nativeElement.querySelector('p');
    expect(errorMessageElement.textContent).toContain(
      'Ocurrió un error inesperado'
    );
  });

  it('debería renderizar un enlace para volver al inicio', () => {
    const linkElement = fixture.nativeElement.querySelector('a');
    expect(linkElement.textContent).toContain('Volver al inicio');
    expect(linkElement.getAttribute('routerLink')).toBe('/');
  });
});
