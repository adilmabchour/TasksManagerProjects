import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './admin/about/about.component';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { CanActivateGuardService } from './auth/can-activate-guard.service';
import { LoginComponent } from './login/login.component';
import { ProjectsComponent } from './projects/projects.component';
import { SignUpComponent } from './sign-up/sign-up.component';

const routes: Routes = [
  
  {path:'dashboard',component:DashboardComponent, canActivate:[CanActivateGuardService],data : {
    expect : "ROLE_ADMIN"
  }},
  {path:'about',component:AboutComponent},
  {path:'projects',component:ProjectsComponent, canActivate:[CanActivateGuardService],data : {
    expect : "ROLE_ADMIN"
  }},
  {path:'login', component:LoginComponent},
  {path:'signUp', component:SignUpComponent, canActivate:[CanActivateGuardService],data : {
    expect : "ROLE_ADMIN"}},
  {path:'',redirectTo:'login',pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{useHash:true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
