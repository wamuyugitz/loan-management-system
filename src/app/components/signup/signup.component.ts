import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AnimationOptions } from 'ngx-lottie';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent {
  options: AnimationOptions = {
    path: 'https://lottie.host/ec7ce1ac-aee5-4de8-8b38-d17c3bf7c0f4/AJ3vESyVf6.json',
    autoplay: true,
    loop: false,
  };

  firstName: string = '';
  lastName: string = '';
  email: string = '';
  username: string = '';
  password: string = '';
  confirmPassword: string = '';

  constructor(private router: Router) {}

  onSignup() {
    if (
      !this.firstName ||
      !this.lastName ||
      !this.email ||
      !this.username ||
      !this.password ||
      !this.confirmPassword
    ) {
      alert('Please fill all fields');
      return;
    }

    if (this.password !== this.confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    const userData = {
      firstname: this.firstName,
      lastname: this.lastName,
      email: this.email,
      username: this.username,
      password: this.password,
    };

    console.log(
      'User signed up with:',
      this.firstName,
      this.lastName,
      this.email,
      this.username
    );
  }
}
