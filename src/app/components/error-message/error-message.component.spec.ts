import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ErrorMessageComponent } from '@app/components/error-message/error-message.component';

describe('ErrorMessageComponent', () => {
  let component: ErrorMessageComponent;
  let fixture: ComponentFixture<ErrorMessageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ErrorMessageComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ErrorMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('debería crear el componente correctamente', () => {
    expect(component).toBeTruthy();
  });

  it('debería mostrar el mensaje de error cuando se proporciona un mensaje', () => {
    const testMessage = 'Este es un mensaje de error';
    component.message = testMessage;
    fixture.detectChanges();

    const errorMessageElement = fixture.nativeElement.querySelector('.error-message');
    expect(errorMessageElement.textContent).toContain(testMessage);
  });

  it('no debería mostrar ningún mensaje cuando el mensaje es null', () => {
    component.message = null;
    fixture.detectChanges();

    const errorMessageElement = fixture.nativeElement.querySelector('.error-message');
    expect(errorMessageElement).toBeNull();
  });

  it('no debería mostrar ningún mensaje cuando el mensaje es una cadena vacía', () => {
    component.message = '';
    fixture.detectChanges();

    const errorMessageElement = fixture.nativeElement.querySelector('.error-message');
    expect(errorMessageElement).toBeNull();
  });
});