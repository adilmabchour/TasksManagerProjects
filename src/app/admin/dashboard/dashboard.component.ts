import { Component, OnInit } from '@angular/core';
import { DashboardService } from 'src/app/services/dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  Designation:string='';
  Username:string='';
  NoOfTeamMembers:number=0; 
  TotalCostOfAllProjects:number=0;
  PendingTasks:number=0;
  UpComingProjects:number=0;
  ProjectCost:number=0;

  CurrentExpenditure:number=0;
  AvailableFunds:number=0;

  Clients:string[] = [];
  Projects:string[] = [];
  Years:number[] = [];
  TeamMembersSummary:any[] = [];
  TeamMembers:any[] = [];
  constructor(private dashboardService:DashboardService) { }

  ngOnInit(): void {
    this.Designation ='Team leader';
    this.Username ='Adil Mabchour';
    this.NoOfTeamMembers = 67; 
    this.TotalCostOfAllProjects = 240;
    this.PendingTasks = 15;
    this.UpComingProjects = 2;
    this.ProjectCost = 387267;
    this.CurrentExpenditure = 92778;
    this.AvailableFunds = 545728;
    this.Clients = ["ABC Infotech Ltd","DEF Software","GHI Industries"]
    this.Projects = ["Project A","Project B","Project C","Project D"]
    for (var i = 2019; i >= 2010; i--) {
      this.Years.push(i);
    }
    this.TeamMembersSummary = this.dashboardService.getTeamMembersSummary()

    this.TeamMembers = [
      {
        Region:'East',Membres:[
          {Id:1,Name:'Ford',Status:'Available'},
          {Id:2,Name:'Miller',Status:'Available'},
          {Id:3,Name:'Jones',Status:'Busy'},
          {Id:4,Name:'James',Status:'Busy'}
        ]
      },
      {
        Region:'West',Membres:[
          {Id:5,Name:'Ford',Status:'Available'},
          {Id:6,Name:'Ana',Status:'Available'},
          {Id:7,Name:'Arun',Status:'Busy'},
          {Id:8,Name:'Jasmine',Status:'Busy'}
        ]
      },
      {
        Region:'South',Membres:[
          {Id:9,Name:'Krishna',Status:'Available'},
          {Id:10,Name:'Mohan',Status:'Available'},
          {Id:11,Name:'Raju',Status:'Busy'},
          {Id:12,Name:'Farooq',Status:'Busy'}
        ]
      },
      {
        Region:'North',Membres:[
          {Id:13,Name:'Jacob',Status:'Available'},
          {Id:14,Name:'Smith',Status:'Available'},
          {Id:15,Name:'Jones',Status:'Busy'},
          {Id:16,Name:'James',Status:'Busy'}
        ]
      }
    ]
  }
  
  onProjectChange($event:any){
    if($event.target.innerHTML === "Project A"){
      this.ProjectCost = 46726;
      this.CurrentExpenditure = 48277;
      this.AvailableFunds = 42786;
    }else if($event.target.innerHTML === "Project B"){
      this.ProjectCost = 12345;
      this.CurrentExpenditure = 1435;
      this.AvailableFunds = 18729;
    }
    else if($event.target.innerHTML === "Project C"){
      this.ProjectCost = 27689;
      this.CurrentExpenditure = 20982;
      this.AvailableFunds = 26578;
    }else if($event.target.innerHTML === "Project D"){
      this.ProjectCost = 387267;
      this.CurrentExpenditure = 36723;
      this.AvailableFunds = 365818;
    }
  }
}
