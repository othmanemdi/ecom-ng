import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public authenticated!: boolean;
  public authenticatedUser!: any;
  private users = [
    { username: "admin@gmail.com", password: "123456" },
    { username: "user@gmail.com", password: "123456" },
  ]

  constructor(private http: HttpClient) { }

  login(username: string, password: string) {
    let user;
    this.users.forEach(u => {
      if (u.username === username && u.password === password) {
        user = u;
      }
    })
    if (user) {
      console.log('Loged')
      this.authenticated = true;
      this.authenticatedUser = user;
      localStorage.setItem("authenticatedUser", JSON.stringify(this.authenticatedUser));
    }
    else {
      this.authenticated = false;
    }
  }

  loadUser() {
    let user = localStorage.getItem('authenticatedUser');
    if (user) {
      this.authenticatedUser = JSON.parse(user);
      this.authenticated = true;
    }
  }

  isAuthenticated() {
    return this.authenticated;
  }

  logout() {
    this.authenticated = false;
    this.authenticatedUser = undefined;
    localStorage.removeItem('authenticatedUser');
  }
}
