import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AboutComponent } from './about/about.component';
import { MyProfileComponent } from './my-profile/my-profile.component';
import { ProjectsComponent } from '../projects/projects.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DashboardService } from '../services/dashboard.service';
import { TeamSizeValidatorDirective } from '../team-size-validator.directive';
import { ClientLocationStatusValidatorDirective } from '../client-location-status-validator.directive';
import { ProjectComponent } from './project/project.component';
import { CheckBoxPrinterComponent } from './check-box-printer/check-box-printer.component';



@NgModule({
  declarations: [
    DashboardComponent,
    AboutComponent,
    MyProfileComponent,
    ProjectsComponent,
    TeamSizeValidatorDirective,
    ClientLocationStatusValidatorDirective,
    ProjectComponent,
    CheckBoxPrinterComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports:[
    DashboardComponent,
    AboutComponent,
    MyProfileComponent,
    ProjectsComponent,
    TeamSizeValidatorDirective,
    ClientLocationStatusValidatorDirective
  ],
  providers:[DashboardService]
})
export class AdminModule { }
