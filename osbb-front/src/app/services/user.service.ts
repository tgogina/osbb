import {Injectable} from '@angular/core';
import {ReplaySubject} from 'rxjs';

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

@Injectable({providedIn: 'root'})
export class UserService {
  private readonly userKey: string = 'user';
  user$: ReplaySubject<User> = new ReplaySubject<User>(1);

  setUser(user: User): void {
    this.user$.next(user);
    localStorage.setItem(this.userKey, JSON.stringify(user));
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
}
