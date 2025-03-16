import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of, throwError } from 'rxjs';
import { UserDetailComponent } from './user-detail.component';
import { GithubService } from '@services/github.service';

describe('UserDetailComponent', () => {
  let component: UserDetailComponent;
  let fixture: ComponentFixture<UserDetailComponent>;
  let githubServiceSpy: jasmine.SpyObj<GithubService>;

  const activatedRouteStub = {
    snapshot: {
      paramMap: {
        get: (key: string) => 'testuser' 
      }
    }
  };

  beforeEach(async () => {

    const spy = jasmine.createSpyObj('GithubService', ['getUserDetails']);

    await TestBed.configureTestingModule({

      imports: [UserDetailComponent],
      providers: [
        { provide: ActivatedRoute, useValue: activatedRouteStub },
        { provide: GithubService, useValue: spy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(UserDetailComponent);
    component = fixture.componentInstance;
    githubServiceSpy = TestBed.inject(GithubService) as jasmine.SpyObj<GithubService>;
  });

  it('debería crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('debería cargar los detalles del usuario correctamente', () => {
    const dummyUser = {
      avatar_url: 'avatar.jpg',
      id: 1,
      name: 'Usuario de Prueba',
      login: 'testuser',
      email: 'test@example.com',
      html_url: 'http://github.com/testuser',
      followers: 100,
      following: 50,
      bio: 'Biografía de prueba'
    };


    githubServiceSpy.getUserDetails.and.returnValue(of(dummyUser));

 
    fixture.detectChanges();

    expect(component.isLoading).toBeFalse();
    expect(component.user).toEqual(dummyUser);
    expect(component.error).toBeNull();
  });

  it('debería manejar el error cuando falla la carga de detalles del usuario', () => {

    githubServiceSpy.getUserDetails.and.returnValue(throwError(() => new Error('error')));

    fixture.detectChanges();

    expect(component.isLoading).toBeFalse();
    expect(component.user).toBeUndefined();
    expect(component.error).toEqual('Error al obtener detalles del usuario.');
  });
});
