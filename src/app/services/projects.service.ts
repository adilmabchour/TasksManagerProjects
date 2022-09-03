import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { BehaviorSubject, map, Observable, Observer, Subject } from 'rxjs';
import { Project } from '../models/project';

@Injectable({
  providedIn: 'root'
})
export class ProjectsService {
  url:string = "";
  hideDetails: boolean = false;
  public MySubject!:BehaviorSubject<boolean>;

  constructor(private http:HttpClient) {
    this.MySubject = new BehaviorSubject<boolean>(false);
  }
  
  toggelDetail(){
    // this.hideDetails = !this.hideDetails;
    // this.MySubject.next(this.hideDetails);
    this.MySubject.next(!this.MySubject.value);
    // for(let i = 0 ; i<this.MyObservrs.length ; i++){
    //   this.MyObservrs[i].next(this.hideDetails);
    // }
  }

  getAllProjects():Observable<Project[]>{
    return this.http.get<Project[]>("http://localhost:8081/project/listProjects",{responseType : "json"})
    .pipe(map(
      (data:Project[])=>{
        return data;
      }
    ));
  }

  addProject(newProject:Project):Observable<Project>{
    return this.http.post<Project>("http://localhost:8081/project/addProject",newProject);
  }

  editProject(newProject:Project):Observable<Project>{
    return this.http.put<Project>("http://localhost:8081/project/editProject",newProject);
  }
  
  deleteroject(id:number):Observable<string>{
    return this.http.delete<string>("http://localhost:8081/project/deleteProject/" + id);
  }

  searchProjects(searchBy:string,searchText:string):Observable<Project[]>{
    return this.http.get<Project[]>("http://localhost:8081/project/getProject/"+searchBy+"/"+searchText,{responseType : "json"});
  }

}
