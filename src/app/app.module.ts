import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { StopWatchComponent } from './stop-watch/stop-watch.component';
import { TimeFormatPipe } from './shared/pipe/time-format.pipe';

@NgModule({
  declarations: [
    AppComponent,
    StopWatchComponent,
    TimeFormatPipe
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
