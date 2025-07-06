import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GuestUser } from '../models/guest-user';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GuestService {
  private baseUrl = 'http://localhost:8087/api/guest';

  constructor(private http: HttpClient) {}

  login(guest: GuestUser): Observable<GuestUser> {
    return this.http.post<GuestUser>(`${this.baseUrl}/login`, guest);
  }

  getOnlineGuests(): Observable<GuestUser[]> {
    return this.http.get<GuestUser[]>(`${this.baseUrl}/online`);
  }

  logout(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/logout/${id}`);
  }
}
