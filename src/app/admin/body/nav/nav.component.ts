import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent {

  constructor(
    public authService: AuthService,
    private router: Router,
    private toastrService: ToastrService
  ) {

  }

  logout() {
    this.authService.logout();
    this.router.navigateByUrl('/login');
    this.toastrService.success('Message Success!', 'Bien déconnecter');
  }

}
