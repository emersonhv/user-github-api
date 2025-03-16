import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, from } from 'rxjs';
import axios, { AxiosResponse } from 'axios';
import { GithubApi } from '@constants/guthub-api.enum';


@Injectable({
  providedIn: 'root',
})
export class GithubService {
  private apiUrl = GithubApi.SEARCH_USERS;
  private apiUrlFllower = GithubApi.SEARCH_USER;

  constructor(private http: HttpClient) {}

  searchUsersObservable(query: string): Observable<any> {
    /*if (!query || query.trim() === '') {
      throw new Error('La consulta no puede estar vacía.');
    }*/
    const url = `${this.apiUrl}?q=${query}&per_page=10`;
    
    return this.http.get(url);
    
  }

  async searchUsersPromise(query: string): Promise<any> {
    if (!query || query.trim() === '') {
      throw new Error('La consulta no puede estar vacía.');
    }
    const url = `${this.apiUrl}?q=${query}&per_page=10`;
    try {
      const response: AxiosResponse = await axios.get(url);
      return response.data;
    } catch (error) {
      throw new Error('Error al realizar la búsqueda.');
    }
  }

  getUserDetails(username: string): Observable<any> {
    const url = `${GithubApi.SEARCH_USER}/${username}`;
    return this.http.get(url);
  }

  async searchUsersFollowersPromise(query: string): Promise<any> {
    if (!query || query.trim() === '') {
      throw new Error('La consulta no puede estar vacía.');
    }
    const url = `${GithubApi.SEARCH_USER}/${query}`;
    try {
      const response: AxiosResponse = await axios.get(url);
      return response.data.followers;
    } catch (error) {
      throw new Error('Error al realizar la búsqueda.');
    }
  }

}
