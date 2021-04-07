import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'timeFormat'
})
export class TimeFormatPipe implements PipeTransform {
    transform(value: any, ...args: any[]): any {
        return (value + '').length === 1 ? '0' + value : value + '';
    }
}