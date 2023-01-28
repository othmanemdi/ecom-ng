import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form: FormGroup;

  constructor(private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private toastrService: ToastrService
  ) {
    this.form = this.fb.group({
      // email: 'admin@gmail.com',
      // password: '123456',
      email: '',
      password: ''
    });
  }



  ngOnInit() {

  }


  submit() {
    // console.log(this.form.getRawValue());
    const formData = this.form.getRawValue();
    const data = {
      username: formData.email,
      password: formData.password
    };

    this.authService.login(data.username, data.password);
    if (this.authService.isAuthenticated()) {
      this.router.navigateByUrl('/admin');
      this.toastrService.success('Message Success!', 'Bien connecter');
    } else {
      this.toastrService.error('Message Danger!', 'Email ou mot de passe incorrecte');
    }
  }


}
