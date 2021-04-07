import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class StopwatchService {

  initialState = {
    mm:0,
    ss:0,
    ms:0
  }

  nextState = {...this.initialState};
  dataList: Array<any> = new Array();
  timerData = new BehaviorSubject(this.initialState);
  tmpList: Array<any> = [];
  savedTimerData = new BehaviorSubject(this.tmpList);
  constructor(private localStorageService:LocalStorageService) {}

  incrementTimer(){
    console.log(this.nextState)
     this.nextState.ms++;
        
        if (this.nextState.ms >= 100) {
          this.nextState.ss++;
          this.nextState.ms = 0;
        }
        if (this.nextState.ss >= 60) {
          this.nextState.mm++;
          this.nextState.ss = 0
        }
        this.timerData.next(this.nextState)
        this.localStorageService.setTimerData(this.nextState)
  }

  addTimerToList(timer: any) {
    this.tmpList.push({
      mm:timer.mm,
      ss:timer.ss,
      ms:timer.ms
    });    
    this.savedTimerData.next(this.tmpList);
    this.localStorageService.setTimerList(this.tmpList);
  }

  removeSingleTimerByIndex(index: number){
    for(let i=0 ;i<= this.tmpList.length ;i++){
  		if(index== this.tmpList[i]){
  			this.tmpList.splice(i,1)
  		}
  	}
    this.localStorageService.setTimerList(this.tmpList)
  }


  clearAll() {
    this.nextState = this.initialState
    this.tmpList = []
    this.savedTimerData.next([])
    this.timerData.next(this.initialState)
    localStorage.clear()
  }

  getValuesFromLocalStorage(){
    this.tmpList = this.localStorageService.getTimerList() || []
    this.nextState =this.localStorageService.getTimerData()  || this.nextState;

    this.savedTimerData.next(this.tmpList)
    this.timerData.next(this.nextState)
  }
}
