import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { GuestUser } from '../models/guest-user';

@Component({
  selector: 'app-online-users',
  standalone: true,
  templateUrl: './online-users.component.html',
  styleUrls: ['./online-users.component.scss'],
  imports: [CommonModule],
})
export class OnlineUsersComponent implements OnInit {
  onlineUsers: GuestUser[] = [];
  isLoading = false;
  errorMessage: string | null = null;

  @Output() userSelected = new EventEmitter<GuestUser>();

  constructor(private http: HttpClient) {
    console.log('🛠️ OnlineUsersComponent initialized');
  }

  ngOnInit(): void {
    this.fetchOnlineUsers();
  }

  fetchOnlineUsers(): void {
    this.isLoading = true;
    this.errorMessage = null;

    const url = 'http://127.0.0.1:8522/api/guest/online';
    console.log('📡 Fetching online users from:', url);

    this.http.get<GuestUser[]>(url).subscribe({
      next: (users) => {
        console.log('✅ Raw API response:', users);
        this.onlineUsers = users;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('❌ Error fetching users:', err);
        this.errorMessage = `Failed to load users: ${err.message || 'Unknown error'}`;
        this.isLoading = false;
      }
    });
  }

  selectUser(user: GuestUser): void {
    this.userSelected.emit(user);
  }
}














/*
import {
  Component, Input, Output, EventEmitter
} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { GuestUser } from '../models/guest-user';

@Component({
  selector: 'app-online-users',
  standalone: true,
  templateUrl: './online-users.component.html',
  styleUrls: ['./online-users.component.scss'],
  imports: [CommonModule],
})
export class OnlineUsersComponent {
  private _currentUser?: GuestUser;
  onlineUsers: GuestUser[] = [];
  originalUsers: GuestUser[] = [];
  sortOrder: 'female-first' | 'male-first' = 'female-first';
  isLoading = false;
  errorMessage: string | null = null;

  @Input()
  set currentUser(user: GuestUser | undefined) {
    this._currentUser = user;
    console.log('🛠️ OnlineUsersComponent currentUser set:', user);

    if (user?.id) {
      setTimeout(() => this.fetchOnlineUsers(), 0);  // ✅ Delay fetch until change detection completes
    } else {
      this.errorMessage = 'No current user found.';
    }
  }

  get currentUser(): GuestUser | undefined {
    return this._currentUser;
  }

  @Output() userSelected = new EventEmitter<GuestUser>();

  constructor(private http: HttpClient) {
    console.log('🛠️ OnlineUsersComponent initialized');
  }

  fetchOnlineUsers(): void {
    if (!this.currentUser?.id) {
      console.warn('⚠️ currentUser not ready yet. Skipping fetch.');
      return;
    }

    this.isLoading = true;
    this.errorMessage = null;
    const url = 'http://127.0.0.1:8522/api/guest/online';
    console.log('📡 Fetching online users from:', url);
    console.log('👤 Fetching with currentUser.id =', this.currentUser?.id);

    this.http.get<GuestUser[]>(url).subscribe({
      next: (users) => {
        console.log('✅ Raw API response:', users);
        this.originalUsers = users.filter(u => u.id !== this.currentUser?.id);

        if (this.originalUsers.length === 0) {
          this.errorMessage = 'No online users found.';
        }

        this.applySorting();
        this.isLoading = false;
      },
      error: (err) => {
        console.error('❌ Error fetching users:', err);
        this.errorMessage = `Failed to load users: ${err.message || 'Unknown error'}`;
        this.isLoading = false;
      },
    });
  }

  toggleSortOrder(): void {
    this.sortOrder = this.sortOrder === 'female-first' ? 'male-first' : 'female-first';
    this.applySorting();
  }

  applySorting(): void {
    this.onlineUsers = [...this.originalUsers].sort((a, b) => {
      const genderA = (a.gender || '').toLowerCase().trim();
      const genderB = (b.gender || '').toLowerCase().trim();

      if (this.sortOrder === 'female-first') {
        return genderA === 'female' && genderB === 'male' ? -1 :
               genderA === 'male' && genderB === 'female' ? 1 : 0;
      } else {
        return genderA === 'male' && genderB === 'female' ? -1 :
               genderA === 'female' && genderB === 'male' ? 1 : 0;
      }
    });

    console.log('🛠️ Users sorted:', this.onlineUsers);
  }

  selectUser(user: GuestUser): void {
    this.userSelected.emit(user);
  }

  getCountryFlag(country: string): string {
    const code = this.countryCodeFromName(country);
    return code ? String.fromCodePoint(...[...code.toUpperCase()].map(c => 127397 + c.charCodeAt(0))) : '';
  }

  countryCodeFromName(name: string): string {
    const map: { [key: string]: string } = {
      India: 'IN',
      USA: 'US',
      Canada: 'CA',
      Germany: 'DE',
      France: 'FR',
      Japan: 'JP',
    };
    return map[name] || '';
  }
}
*/