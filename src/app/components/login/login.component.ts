import { Component } from '@angular/core';
import { AnimationOptions } from 'ngx-lottie';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  options: AnimationOptions = {
    path: 'https://lottie.host/3e5a0224-c90b-4bd3-bd63-6403ce3eb853/M8mW2PpRNt.json',
    autoplay: true,
    loop: true,
  };

  username: string = '';
  password: string = '';

  onLogin() {
    console.log('Username:', this.username);
    console.log('Password:', this.password);
  }
}
