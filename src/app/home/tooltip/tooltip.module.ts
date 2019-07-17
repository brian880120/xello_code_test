import { TooltipService } from './tooltip.service';
import { TooltipComponent } from './tooltip.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [
        TooltipComponent,
    ],
    providers: [
        TooltipService,
    ],
    exports: [
        TooltipComponent,
    ],
})
export class TooltipModule { }
