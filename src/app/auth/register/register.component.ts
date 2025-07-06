import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms'; // ✅ Import ReactiveFormsModule
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  standalone: true,
  selector: 'app-register',
  imports: [CommonModule, FormsModule, ReactiveFormsModule], // ✅ Add ReactiveFormsModule here
  templateUrl: './register.component.html'
})
export class RegisterComponent {
  registerForm: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService) {
    this.registerForm = this.fb.group({
      email: [''],
      phone: [''],
      password: ['']
    });
  }

  onSubmit() {
    this.authService.register(this.registerForm.value).subscribe({
      next: () => alert('Registered successfully'),
      error: err => alert('Registration failed')
    });
  }
}
