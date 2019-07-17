import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TooltipService } from './tooltip.service';
import { TooltipComponent } from './tooltip.component';

@NgModule({
    imports: [
        CommonModule,
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
