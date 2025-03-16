import { ComponentFixture, TestBed, fakeAsync, flushMicrotasks, tick } from '@angular/core/testing';
import { UserChartComponent } from '@components/user-chart/user-chart.component';
import { GithubService } from '@services/github.service';
import { Chart, registerables } from 'chart.js';

describe('UserChartComponent', () => {
  let component: UserChartComponent;
  let fixture: ComponentFixture<UserChartComponent>;
  let githubServiceSpy: jasmine.SpyObj<GithubService>;
  let fakeChart: any;

  beforeEach(async () => {
    // Se crea un spy para el servicio de GitHub
    const spy = jasmine.createSpyObj('GithubService', [
      'searchUsersPromise',
      'searchUsersFollowersPromise'
    ]);

    await TestBed.configureTestingModule({
      imports: [UserChartComponent],
      providers: [
        { provide: GithubService, useValue: spy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(UserChartComponent);
    component = fixture.componentInstance;
    githubServiceSpy = TestBed.inject(GithubService) as jasmine.SpyObj<GithubService>;

    // Preparamos datos dummy para la búsqueda de usuarios:
    const dummyUsers = {
      items: Array.from({ length: 10 }, (_, i) => ({ login: `user${i}` }))
    };

    // El método searchUsersPromise retorna una promesa que se resuelve con dummyUsers.
    githubServiceSpy.searchUsersPromise.and.returnValue(Promise.resolve(dummyUsers));
    // Cada llamada a searchUsersFollowersPromise retorna una promesa resuelta con un número (por ejemplo, 10).
    githubServiceSpy.searchUsersFollowersPromise.and.callFake((username: string) => {
      return Promise.resolve(10);
    });

    // Creamos un objeto fake para simular la instancia de Chart,
    // y así poder espiar el método update.
    fakeChart = {
      data: {
        datasets: [{ data: [] }]
      },
      update: jasmine.createSpy('update')
    };

    // Espiamos el método createChart para evitar que se ejecute la lógica real de Chart.js,
    // y en su lugar asignar el fakeChart a la propiedad chart del componente.
    spyOn(component, 'createChart').and.callFake((names: any[], followers: number[]) => {
      component.chart = fakeChart;
    });
  });

  it('debería crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('debería llamar a loadUserData y crear el gráfico', fakeAsync(() => {
    // Al ejecutar detectChanges se dispara ngOnInit() y por ende loadUserData()
    fixture.detectChanges();

    // Se resuelven las promesas pendientes
    flushMicrotasks();

    // Se verifica que se haya llamado al método searchUsersPromise con el query 'a'
    expect(githubServiceSpy.searchUsersPromise).toHaveBeenCalledWith('a');

    // Se espera que se extraigan 10 nombres (user0 a user9)
    const expectedNames = Array.from({ length: 10 }, (_, i) => `user${i}`);
    // Se comprueba que createChart haya sido llamado con los nombres extraídos y un arreglo para seguidores (aunque en este punto puede estar vacío por la naturaleza asíncrona)
    expect(component.createChart).toHaveBeenCalledWith(expectedNames, jasmine.any(Array));

    // Simulamos el paso de 1 segundo para que se ejecute el setInterval definido en createChart
    tick(1000);
    expect(fakeChart.update).toHaveBeenCalled();
  }));
});
