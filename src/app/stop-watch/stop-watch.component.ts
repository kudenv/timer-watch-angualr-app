import { Component, OnInit, OnDestroy } from '@angular/core';
import { LocalStorageService } from '../shared/service/local-storage.service';
import { StopwatchService } from '../shared/service/stopwatch.service';

@Component({
  selector: 'app-stop-watch',
  templateUrl: './stop-watch.component.html',
  styleUrls: ['./stop-watch.component.css']
})
export class StopWatchComponent implements OnInit, OnDestroy {

  mm = 0;
  ss = 0;
  ms = 0;

  
  public timer = {
    mm:0,
    ss:0,
    ms:0
  }
  public isRunning = false;
  public timerId:any = 0;
  public list: Array<any> = [];

  hideElement = false;
  selectedIndex: any;

  private _timerSubscription: any;
  private _listDataSubscription: any;

  constructor(private _stopWatchService: StopwatchService, private _localStorageService: LocalStorageService) {}

  ngOnInit() {
    this._stopWatchService.getValuesFromLocalStorage();
    this.isRunning = this._localStorageService.getRuningFlag() === "true" ? true : false;

    if (this.isRunning) {
      this.continueTimer()
    }

    this._listDataSubscription = this._stopWatchService.savedTimerData.subscribe((data) => {
      this.list = data;
    })

    this._timerSubscription = this._stopWatchService.timerData.subscribe((data) => {
      this.timer = data;
    })
  }

  playPause(flag?: any) {
    if(!this.isRunning) {
      this.timerId = setInterval(() => {
        this._stopWatchService.incrementTimer();
      }, 10)
    } else {
      clearInterval(this.timerId)
    }
    if (flag === false || flag === undefined) {
      this.isRunning = !this.isRunning;
      this._localStorageService.setRuningFlag(this.isRunning);
    }
  }

  continueTimer() {
    this.timerId = setInterval(() => {
      this._stopWatchService.incrementTimer();
    })
  }

  add(timer: any) {
    this._stopWatchService.addTimerToList(timer);
  }

  deleteAll() {
    this._stopWatchService.clearAll();
  }

  remove(index: number) {
    this._stopWatchService.removeSingleTimerByIndex(index);
  }

  setButton(flag: any, selectedIndex: number) {
    this.selectedIndex = selectedIndex;
    if(flag == true) {
      this.hideElement = false;
    } else {
      this.hideElement = true;
    }
  }

  ngOnDestroy() {
    this._timerSubscription.unsubscribe();
    this._listDataSubscription.unsubscribe();
  }

}
