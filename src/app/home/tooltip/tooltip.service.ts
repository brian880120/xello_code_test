import { Injectable } from "@angular/core";
import { Subject, Observable } from 'rxjs';
import tooltipConstant from './tooltip.constant';

@Injectable()
export class TooltipService {
    private tooltipPositionChangeStream: Subject<any>;
    public tooltipPositionChangeObservable: Observable<any>;

    constructor() {
        this.tooltipPositionChangeStream = new Subject<any>();
        this.tooltipPositionChangeObservable = this.tooltipPositionChangeStream.asObservable();
    }

    updateTooltipPosition(elementRef) {
        const siblingElement = elementRef.nativeElement.nextSibling;
        const siblingTop = siblingElement.offsetTop;
        const siblingHeight = siblingElement.getBoundingClientRect().height;
        const elementTop = elementRef.nativeElement.getBoundingClientRect().y
        if (elementTop < tooltipConstant.DEFAULT_HEIGHT) {
            this.tooltipPositionChangeStream.next(siblingHeight + siblingTop);
        } else {
            this.tooltipPositionChangeStream.next(siblingTop - tooltipConstant.DEFAULT_HEIGHT);
        }
    }
}