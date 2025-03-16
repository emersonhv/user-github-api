import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { GithubService } from '@services/github.service';
import { GithubApi } from '@constants/guthub-api.enum';
import axios, { AxiosResponse } from 'axios';

describe('GithubService', () => {
  let service: GithubService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [GithubService]
    });

    service = TestBed.inject(GithubService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  describe('searchUsersObservable', () => {
    it('debería realizar una petición GET y retornar los datos esperados', () => {
      const query = 'test';
      const dummyResponse = { items: [{ login: 'user1' }, { login: 'user2' }] };

      service.searchUsersObservable(query).subscribe(response => {
        expect(response).toEqual(dummyResponse);
      });

      const req = httpTestingController.expectOne(`${GithubApi.SEARCH_USERS}?q=${query}&per_page=10`);
      expect(req.request.method).toBe('GET');
      req.flush(dummyResponse);
    });
  });

  describe('getUserDetails', () => {
    it('debería realizar una petición GET y retornar los detalles del usuario', () => {
      const username = 'testuser';
      const dummyUser = { id: 1, login: username };

      service.getUserDetails(username).subscribe(response => {
        expect(response).toEqual(dummyUser);
      });

      const req = httpTestingController.expectOne(`${GithubApi.SEARCH_USER}/${username}`);
      expect(req.request.method).toBe('GET');
      req.flush(dummyUser);
    });
  });

  describe('searchUsersPromise', () => {
    it('debería retornar los datos de la búsqueda cuando el query es válido', async () => {
      const query = 'test';
      const dummyData = { items: [{ login: 'user1' }, { login: 'user2' }] };

      spyOn(axios, 'get').and.returnValue(Promise.resolve({ data: dummyData } as AxiosResponse));

      const result = await service.searchUsersPromise(query);
      expect(axios.get).toHaveBeenCalledWith(`${GithubApi.SEARCH_USERS}?q=${query}&per_page=10`);
      expect(result).toEqual(dummyData);
    });

    it('debería lanzar un error cuando el query está vacío', async () => {
      const query = '';

      try {
        await service.searchUsersPromise(query);
        fail('Se esperaba que lanzara un error');
      } catch (error: any) {
        expect(error.message).toBe('La consulta no puede estar vacía.');
      }
    });

    it('debería lanzar un error cuando axios falla', async () => {
      const query = 'test';

      spyOn(axios, 'get').and.returnValue(Promise.reject(new Error('Network Error')));

      try {
        await service.searchUsersPromise(query);
        fail('Se esperaba que lanzara un error');
      } catch (error: any) {
        expect(error.message).toBe('Error al realizar la búsqueda.');
      }
    });
  });

  describe('searchUsersFollowersPromise', () => {
    it('debería retornar el número de seguidores cuando el query es válido', async () => {
      const query = 'testuser';
      const dummyFollowers = 42;

      spyOn(axios, 'get').and.returnValue(Promise.resolve({ data: { followers: dummyFollowers } } as AxiosResponse));

      const result = await service.searchUsersFollowersPromise(query);
      expect(axios.get).toHaveBeenCalledWith(`${GithubApi.SEARCH_USER}/${query}`);
      expect(result).toEqual(dummyFollowers);
    });

    it('debería lanzar un error cuando el query está vacío', async () => {
      const query = '   ';

      try {
        await service.searchUsersFollowersPromise(query);
        fail('Se esperaba que lanzara un error');
      } catch (error: any) {
        expect(error.message).toBe('La consulta no puede estar vacía.');
      }
    });

    it('debería lanzar un error cuando axios falla', async () => {
      const query = 'testuser';

      spyOn(axios, 'get').and.returnValue(Promise.reject(new Error('Network Error')));

      try {
        await service.searchUsersFollowersPromise(query);
        fail('Se esperaba que lanzara un error');
      } catch (error: any) {
        expect(error.message).toBe('Error al realizar la búsqueda.');
      }
    });
  });
});

