import { Component, OnInit, NgModule } from '@angular/core';
import { RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  //rutas
  goLogin() {
    this.router.navigateByUrl("/login")
  }
  //rutas
  goRegister() {
    this.router.navigateByUrl("/register")
  }

}
