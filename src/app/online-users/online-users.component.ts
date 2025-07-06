import {
  Component,
  Input,
  Output,
  EventEmitter
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

  @Input()
  set currentUser(user: GuestUser | undefined) {
    this._currentUser = user;
    if (user?.id) {
      console.log('✅ currentUser received via setter:', user);
      this.fetchOnlineUsers();
    }
  }

  get currentUser(): GuestUser | undefined {
    return this._currentUser;
  }

  @Output() userSelected = new EventEmitter<GuestUser>();

  onlineUsers: GuestUser[] = [];
  originalUsers: GuestUser[] = [];
  sortOrder: 'female-first' | 'male-first' = 'female-first';

  constructor(private http: HttpClient) {}

  fetchOnlineUsers(): void {
    const url = 'http://127.0.0.1:8522/api/guest/online'; // use IP to avoid potential localhost DNS issues

    console.log('📡 Fetching online users from server...');

    this.http.get<GuestUser[]>(url).subscribe({
      next: (users) => {
        console.log('✅ Users fetched from backend:', users);
        if (this.currentUser?.id) {
          this.originalUsers = users.filter(u => u.id !== this.currentUser!.id);
        } else {
          this.originalUsers = users;
        }
        this.applySorting();
      },
      error: (err) => {
        console.error('❌ Error fetching users:', err);
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
  }

  selectUser(user: GuestUser): void {
    this.userSelected.emit(user);
  }

  getCountryFlag(country: string): string {
    if (!country) return '';
    const code = this.countryCodeFromName(country);
    return code
      ? String.fromCodePoint(...[...code.toUpperCase()].map(c => 127397 + c.charCodeAt(0)))
      : '';
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
