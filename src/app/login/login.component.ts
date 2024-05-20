import { Component } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { StorageService } from '../_services/storage.service';
import { ActivatedRoute, Router } from '@angular/router';
import { OnInit } from '@angular/core';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit{
  form: any = {
    username: null,
    password: null
  };
  isLoginFailed = false;
  isLoggedIn = false;
  returnUrl: string = '';
  errorMessage = '';
  constructor(private route: ActivatedRoute, private authService: AuthService, private storageService: StorageService, private router: Router) { 


  }

  ngOnInit() {
    if(this.storageService.isLoggedIn()) {
      this.isLoggedIn = true;
      

    }
    else {
      this.route.queryParams.subscribe((params) => {
        const value = params['returnUrl'];
        this.returnUrl = value ? decodeURIComponent(value) : '/';
        console.log(this.returnUrl);
      });
    }

  }

  onSubmit() {
    const { username, password } = this.form;
    this.authService.login(username, password).subscribe({
      next: (data: any) => {
        if(data.success) {
          this.storageService.saveUser({username});
          this.isLoginFailed = false;
          this.isLoggedIn = true;
          console.log("going to",this.returnUrl);
          this.router.navigateByUrl(this.returnUrl);
        } else {
          this.errorMessage = 'Invalid credentials';
          this.isLoginFailed = true;
        }
      },
      error: (error) => {
        this.errorMessage = 'Invalid credentials';
        this.isLoginFailed = true;
      }
    });
  }
}

