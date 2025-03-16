import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomeComponent } from '@components/home/home.component';

@Component({
  selector: 'app-user-search',
  template: '<div>User Search</div>'
})
class DummyUserSearchComponent {}

@Component({
  selector: 'app-user-list',
  template: '<div>User List</div>'
})
class DummyUserListComponent {}

@Component({
  selector: 'app-user-chart',
  template: '<div>User Chart</div>'
})
class DummyUserChartComponent {}

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({

      imports: [HomeComponent, DummyUserSearchComponent, DummyUserListComponent, DummyUserChartComponent]
    })

    .overrideComponent(HomeComponent, {
      set: {
        imports: [DummyUserSearchComponent, DummyUserListComponent, DummyUserChartComponent]
      }
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('debería crear el componente HomeComponent', () => {
    expect(component).toBeTruthy();
  });

  it('debería mostrar el título "GitHub Users API"', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const title = compiled.querySelector('h2.title');
    expect(title?.textContent).toContain('GitHub Users API');
  });

  it('debería renderizar el componente UserSearch', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('app-user-search')).toBeTruthy();
  });

  it('debería renderizar el componente UserChart', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('app-user-chart')).toBeTruthy();
  });

  it('debería renderizar el componente UserList', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('app-user-list')).toBeTruthy();
  });
});

