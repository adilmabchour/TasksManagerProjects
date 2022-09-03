import { ClientLocation } from "./client-location";

export class Project {
    projectId:number;
    projectName:string;
    dateOfStart:string;
    teamSize:number;
    active:boolean;
    status:string;
    clientLocationId:number;
    clientLocation:ClientLocation;

    constructor(){
        this.projectId = 0;
        this.projectName = '';
        this.dateOfStart = '';
        this.teamSize = 0;
        this.active = true;
        this.status = '';
        this.clientLocationId = 0;
        this.clientLocation = new ClientLocation();
    }
}
