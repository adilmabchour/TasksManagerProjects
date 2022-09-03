import { Component, ContentChildren, EventEmitter, Input, OnInit, Output, QueryList } from '@angular/core';
import { Subscription } from 'rxjs';
import { Project } from 'src/app/models/project';
import { ProjectsService } from 'src/app/services/projects.service';
import { CheckBoxPrinterComponent } from '../check-box-printer/check-box-printer.component';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss']
})
export class ProjectComponent implements OnInit {
  @Input("currentProject") project!:Project;
  @Input("recordIndex") i!:number;
  @Output() editProject = new EventEmitter();
  @Output() deleteProject = new EventEmitter<any>();
  @ContentChildren("selectionBox") selectionBox!:QueryList<CheckBoxPrinterComponent>;

  MySubscribtion!: Subscription;
  hideDetails: boolean = false;
  constructor(public projectService: ProjectsService) { }

  ngOnInit(): void {
    console.info("----------ngOnInit called");
    this.MySubscribtion = this.projectService.MySubject.subscribe((hide)=>{
      this.hideDetails = hide;
    })
  }

  updateProject(i:number){
    this.editProject.emit(i);
  }

  deletProject(i:number){
    this.deleteProject.emit(i);
  }

  isAllCheckedChange(b: boolean){
    let selectionBox = this.selectionBox.toArray();
    for(let i = 0; i < selectionBox.length ; i++){
      if(b){
        selectionBox[i].check();
      }else{
        selectionBox[i].unCheck();
      }
    }
    
  }
}
