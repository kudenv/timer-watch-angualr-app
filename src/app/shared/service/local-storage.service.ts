import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class LocalStorageService {
    isRuningFlag: string | null = '';
    timerList: any; 
    timerData: string | null = '';
    
    setRuningFlag(flag: any) {
        localStorage.setItem('RUNNING_FLAG',flag.toString());
    }

    getRuningFlag(): string | null {
        this.isRuningFlag = localStorage.getItem('RUNING_FLAG');
        return this.isRuningFlag;
    }

    setTimerList(list: any) {
        localStorage.setItem('TIMER_LIST', JSON.stringify(list));
    }

    getTimerList(): any {
        this.timerList = JSON.parse(localStorage.getItem("TIMER_LIST") || "[]");
        return this.timerList;
    }

    setTimerData(timer: any) {
        localStorage.setItem('TIMER_VALUE', JSON.stringify(timer));
    }

    getTimerData(): any {
        this.timerData = JSON.parse(localStorage.getItem("TIMER_VALUE") as string);
        return this.timerData;
    }

}