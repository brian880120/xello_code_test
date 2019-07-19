import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { TooltipModule } from './home/tooltip/tooltip.module';

import { AppComponent } from './app.component';

@NgModule({
    declarations: [
        AppComponent,
        AppRoutingModule.components,
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        TooltipModule
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
