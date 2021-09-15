import { Component, OnInit } from '@angular/core';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  }

  onSubmit(): void {
    this.authService.login().subscribe(resp => {
      const token: string = resp.headers.get("authorization")!;
      if (token != null) {
        window.localStorage.setItem("jwtToken", token);
      }
    });
  }

}