import { ArrayType } from '@angular/compiler';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title(title: any) {
    throw new Error('Method not implemented.');
    
  }
  newMemberName = "";
  members: string[] = [];
  errorMessage = "";
  numberOfTeams = {} as number;
  teams: string[][] = [];
  

  onInput(member: string){
    this.newMemberName = member;
  }

  addMember(){
    if (!this.newMemberName) {
      this.errorMessage = "Name can't be empty";
      console.log('what?');
      return
    }else{
      this.members.push(this.newMemberName);
      this.newMemberName = ""
      this.errorMessage = "";
    }
  }
  
  onNumberOfTeamsInput(value: string){
    this.numberOfTeams = Number(value);
  }
  
  generateTeams(e: string){
    const teams = [...this.teams];
    const members = [...this.members];
    let numOfTeams = this.numberOfTeams || 0;/////////////////////
    
    switch (e) {
      case 'create':{
        this.checkNumOfTeams();
        this.buildTeams(members, [], numOfTeams, 0);
        this.clearAll(false);
        break;
        }
      case 'createNew':{
        if(this.numberOfTeams > 0){
          this.checkNumOfTeams();
          numOfTeams = this.numberOfTeams+this.teams.length;
          const startingpoint = this.teams.length;
          this.buildTeams(members, teams, numOfTeams, startingpoint);
          this.clearAll(false);
        }else{
          this.errorMessage = 'You need minimum 1 new group.'
          return
        }
        break;
        }
      case 'fitIn':{
        console.log('hi fitin!');
        while (members.length) {
          let member = this.randomMember(members);
          let team = this.teams.reduce((prev, next) => prev.length < next.length? prev: next);
          team.push(member);
          }
          this.clearAll(false);
        break;
        }
      case 'rearrange':{
        numOfTeams = this.teams.length;
        for (let t = 0; t < this.teams.length; t++) {
          for (let m = 0; m < this.teams[t].length; m++) {
            const mmb = this.teams[t][m];
            this.members.push(mmb);
          }
          this.teams[t] = [];
        }
        const membs = [...this.members];
        this.buildTeams(membs, [], numOfTeams, 0);
        this.clearAll(false);
        break;
        }
      default:
        break;
    }

    
  }
  randomMember(mem: any){
    let mymem = mem.splice(Math.floor(Math.random()*mem.length),1)[0];
    return mymem;
  }
  
  clearAll(t: Boolean){
    this.members = [];
    this.numberOfTeams= {} as number;/////////////// want to resuךt to none
    this.errorMessage = ''
    if (t) {
      this.teams = [];
    }
  }
  checkNumOfTeams(){
    if (this.numberOfTeams !> 0) {
      this.errorMessage = "Invalid number of Teams: teams wanted are"+ String(this.numberOfTeams || 0)+", but team members are"+ String(this.members.length);
      return;
    }
    if (this.members.length < this.numberOfTeams) {
      this.errorMessage = "Not enough members: teams wanted are"+ String(this.numberOfTeams)+", but team members are"+ String(this.members.length);
      return;
    }
  }
  buildTeams(members:string[], teams: string[][], numOfTeams: number, sTN: number){
    let currentTeam = [];
    while (members.length) {
      for (let i = sTN; i < numOfTeams; i++){
        let member = this.randomMember(members);
        currentTeam = this.teams[i];
        currentTeam?this.teams[i].push(member):this.teams[i]=[member];
        } 
     
      }
  }

}
