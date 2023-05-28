import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable, ReplaySubject} from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

export interface User {
  id: number;
  name: string;
  lastName: string;
  surName: string;
  property: string;
  propertyId: string;
  registrationInfo?: string;
  isAdmin: boolean;
  email: string;
  password: string;
}

@Injectable({ providedIn: 'root' })
export class UserService {
  private readonly userKey: string = 'user';
  private readonly apiUrl = environment.apiUrl;

  constructor(private readonly httpClient: HttpClient) { }

  user$: BehaviorSubject<User> = new BehaviorSubject<User>(null);

  setUser(user: User): void {
    this.user$.next(user);
    localStorage.setItem(this.userKey, JSON.stringify(user));
  }

  login(email: string, password: string): Observable<User> {
    return this.httpClient
      .post<User>(`${this.apiUrl}api/Auth/login`, { email, password })
      .pipe(tap(user => this.setUser(user)));
  }

  logout(): void {
    this.user$.next(null);
    localStorage.clear();
  }

  checkUser(): void {
    const user = localStorage.getItem(this.userKey);

    if (!!user) {
      this.user$.next(JSON.parse(user));
    }
  }

  getUsers(): Observable<User[]> {
    return this.httpClient.get<User[]>(`${this.apiUrl}api/User/get`);
  }

  addUser(user: User): Observable<void> {
    return this.httpClient.post<void>(`${this.apiUrl}api/User/create`, user);
  }

  deleteUser(userId: number): Observable<void> {
    return this.httpClient.delete<void>(`${this.apiUrl}api/User/delete/${userId}`);
  }
}
