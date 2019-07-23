import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { UserInterface } from '../interfaces';
import { PageInfoInterface } from '../interfaces/pageInfo.interface';

@Injectable({ providedIn: 'root' })
export class ApiService {

  constructor(private http: HttpClient) {
  }

  fetchUsersData(page): Observable<PageInfoInterface> {
    return this.http.get('https://reqres.in/api/users', { params: { page } }) as Observable<PageInfoInterface>;
  }

  fetchUserById(id: number): Observable<any> {
    return this.http.get(`https://reqres.in/api/users/${id}`)
      .pipe(
        map((response: any): UserInterface => response.data)
      );
  }

}
