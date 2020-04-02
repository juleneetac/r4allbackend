import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { AdminComponent } from './components/admin/admin.component';
import { HomeComponent } from './components/home/home.component';
import { RegisterComponent } from './components/register/register.component';
import { MainComponent } from './components/main/main.component';


const routes: Routes = [
  {
    path:'login',
    component: LoginComponent
  },
  {
    path:'register',
    component: RegisterComponent  //--proxy-config proxyconfig.json
  },
  {
    path:'admin',
    component: AdminComponent
  },
  {
    path:'main',
    component: MainComponent
  },
  {
    path:'',
    component: HomeComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{
    enableTracing: true
    })],
  exports: [RouterModule]
})

export class AppRoutingModule { }
