import { Injectable } from "@angular/core";
import { Subject, Observable } from 'rxjs';

@Injectable()
export class TooltipService {
    private tooltipPositionChangeStream: Subject<any>;
    public tooltipPositionChangeObservable: Observable<any>;

    constructor() {
        this.tooltipPositionChangeStream = new Subject<any>();
        this.tooltipPositionChangeObservable = this.tooltipPositionChangeStream.asObservable();
    }

    updateTooltipPosition() {
        this.tooltipPositionChangeStream.next();
    }
}