import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

declare const google: any;

@Component({
  selector: 'app-google-auth',
  templateUrl: './google-auth.component.html',
  styleUrls: ['./google-auth.component.css']
})
export class GoogleAuthComponent implements OnInit {
  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    // Initialize Google Sign-In
    google.accounts.id.initialize({
      client_id: '449206944467-cvif4rm0jt6vnhilfph6srrqavg5gdiu.apps.googleusercontent.com',
      callback: this.handleCredentialResponse.bind(this)
    });

    google.accounts.id.renderButton(
      document.getElementById('googleSignInDiv'),
      { theme: 'outline', size: 'large' }
    );
  }

  handleCredentialResponse(response: any): void {
    const idToken = response.credential;
    console.log("Google ID Token:", idToken);

    this.http.post<{ token: string }>('http://localhost:8087/api/auth/google', {
      token: idToken
    }).subscribe({
      next: (response) => {
        localStorage.setItem('jwt', response.token);
      },
      error: (err) => {
        console.error('Login failed:', err);
      }
    });
  }
}
