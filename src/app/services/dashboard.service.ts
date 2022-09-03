import { Injectable } from '@angular/core';

@Injectable()
export class DashboardService {

  constructor() { }
  
  getTeamMembersSummary(){
    var TeamMembersSummary = [
      {Region:'East',TeamMembersCount:20,TemporarilyUnavilableMembers:4},
      {Region:'West',TeamMembersCount:15,TemporarilyUnavilableMembers:8},
      {Region:'South',TeamMembersCount:17,TemporarilyUnavilableMembers:1},
      {Region:'North',TeamMembersCount:15,TemporarilyUnavilableMembers:6}
    ]

    return TeamMembersSummary
  }
  
}
