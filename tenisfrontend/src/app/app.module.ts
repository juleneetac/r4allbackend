import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TorneosComponent } from './components/torneos/torneos.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { UsuariosComponent } from './components/usuarios/usuarios.component';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { AdminComponent } from './components/admin/admin.component';
import { HomeComponent } from './components/home/home.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    UsuariosComponent,
    TorneosComponent,
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot([
    {
      path:'login',
      component: LoginComponent
    },
    {
      path:'register',
      component: RegisterComponent
    },
    {
      path:'admin',
      component: AdminComponent
    },
    {
      path:'',
      component: HomeComponent
    },
  ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
