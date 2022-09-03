import { Component, ElementRef, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ClientLocation } from '../models/client-location';
import { Project } from '../models/project';
import { CLientLocationsService } from '../services/client-locations.service';
import { ProjectsService } from '../services/projects.service';
import * as $ from 'jquery';
import { ProjectComponent } from '../admin/project/project.component';
import { timeout } from 'rxjs';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit {
  Projects:Project[] = [];
  clientLoctaion:ClientLocation[] = [];
  newProject:Project = new Project();
  editProject:Project = new Project();
  projectDelete:Project = new Project();
  searchBy:string = "";
  searchText:string = "";
  showLoading:boolean = true;
  isAllChecked: boolean = false;

  @ViewChild("newForm") newForm!: NgForm;
  @ViewChild("editForm") editForm!: NgForm;
  @ViewChildren("prj") prj!: QueryList<ProjectComponent>;
  @ViewChild("prjName") prjName!: ElementRef;
  constructor(private projectsService:ProjectsService, private clientLocationService:CLientLocationsService) { }

  ngOnInit(): void {
    this.getAllProjects();
    this.getAllClientLocation();
    this.showLoading = false;
  }
  
  getAllClientLocation(){
    this.clientLocationService.getClientLocations().subscribe(
      (res) => {
        this.clientLoctaion = res;
      },
      (error) => {
        console.log(error);
      }
    )
  }
  getAllProjects(){
    this.projectsService.getAllProjects().subscribe(
      (res:any)=>{
        this.Projects = res;
      }
    );
    
  }
  onNewClick(event: any){
    this.newForm.resetForm();
    setTimeout(()=>{
      this.prjName.nativeElement.focus();
    },100)
  }
  onSaveProject(){
    if(this.newForm.valid){
      this.projectsService.addProject(this.newProject).subscribe(
        (res)=>{
          alert("project ajouter avec success");
          this.getAllProjects();
          this.newProject.projectName = '';
          this.newProject.dateOfStart = '';
          this.newProject.teamSize = 0;
          this.newProject.active = true;
          this.newProject.status = '';
          this.newProject.clientLocationId = 0;
          this.newProject.clientLocation = new ClientLocation();

          $('#newFormCancel').trigger('click')
        },
        (error)=>{console.log(error)}
      )
    } 
  }

  onEditProject(index:number){
    this.editForm.reset();
    setTimeout(() => {
        this.editProject.projectId = this.Projects[index].projectId;
        this.editProject.projectName = this.Projects[index].projectName;
        this.editProject.dateOfStart = this.Projects[index].dateOfStart.substring(0,10); //yyyy-MM-dd
        this.editProject.teamSize = this.Projects[index].teamSize;
        this.editProject.active = this.Projects[index].active;
        this.editProject.status = this.Projects[index].status;
        this.editProject.clientLocationId = this.Projects[index].clientLocationId;
    }, 100); 
  }

  updateProject(){
    if(this.editForm.valid){
      this.projectsService.editProject(this.editProject).subscribe(
        (res)=>{
          this.getAllProjects();
          this.editProject.projectId = 0;
          this.editProject.projectName = '';
          this.editProject.dateOfStart = '';
          this.editProject.teamSize = 0;
          this.editProject.active = false;
          this.editProject.status = '';
          this.editProject.clientLocationId = 0;
          this.editProject.clientLocation = new ClientLocation();
          $('#editFormCancel').trigger('click')
        },
        (error)=>{console.log(error)}
      );
    }
  }
  
  onDeleteProject(index:number){
    this.projectDelete.projectId = this.Projects[index].projectId;
    this.projectDelete.projectName = this.Projects[index].projectName;
  }
  deleteProject(id:number){
    this.projectsService.deleteroject(id).subscribe(
      (res)=>{
        this.getAllProjects()
      },
      (error)=>{console.log(error)}
    );
  }

  searchProject(){
    if(this.searchBy != "" && this.searchText != ""){
      this.projectsService.searchProjects(this.searchBy,this.searchText).subscribe(
        (resp:Project[])=>{
          this.Projects = resp;
        },
        (error)=>{console.log(error)}
      )
    }else{
      this.getAllProjects();
    }
  }

  onHideShowDetails(){
    // let projets = this.prj.toArray();
    // for(let i = 0; i <projets.length; i++){
    //   projets[i].toggelDetail();
    // }
    this.projectsService.toggelDetail();
  }

  isAllCheckedChange(event: any){
    let proj = this.prj.toArray();
    for(let i = 0 ; i < proj.length ; i++){
      proj[i].isAllCheckedChange(this.isAllChecked);
    }
  }
}
