import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = 'http://localhost:8087/api/auth';

  constructor(private http: HttpClient) {}

  // Register with or without file (adjust as needed)
  register(user: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/register`, user);
  }

  // Login API
  login(email: string, password: string): Observable<User> {
    return this.http.post<User>(
      `${this.baseUrl}/login`,
      { email, password },
      { withCredentials: true } // ✅ CORS support with cookies (optional)
    );
  }
}
