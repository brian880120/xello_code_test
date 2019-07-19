import {
    Input,
    Output,
    Component,
    ElementRef,
    HostListener,
    EventEmitter,
    ChangeDetectionStrategy,
    OnInit,
    OnDestroy,
    AfterViewInit,
} from '@angular/core';
import { TooltipService } from './tooltip.service';
import tooltipConstant from './tooltip.constant';

@Component({
    selector: 'tooltip',
    templateUrl: './tooltip.component.html',
    styleUrls: ['./tooltip.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TooltipComponent implements OnInit, AfterViewInit, OnDestroy {
    top: number;
    height: number = tooltipConstant.DEFAULT_HEIGHT;

    private tooltipPositionChangeSubscription;

    constructor(
        private elementRef: ElementRef,
        private tooltipService: TooltipService
    ) {}

    ngOnInit() {
        this.tooltipPositionChangeSubscription = this.tooltipService.tooltipPositionChangeObservable.subscribe((top) => {
            this.top = top;
        });
    }

    ngAfterViewInit() {
        // assign tooltip initial height
        this.top = this.elementRef.nativeElement.nextSibling.offsetTop - tooltipConstant.DEFAULT_HEIGHT;
    }

    ngOnDestroy() {
        this.tooltipPositionChangeSubscription.unsubscribe();
    }

    @Input()
    id: number;

    @Input()
    isOpen: boolean;

    @Input()
    content: string;

    @Output()
    onOutsideClick = new EventEmitter();

    @Output()
    onEscPressed = new EventEmitter();

    @HostListener('document:keydown.escape')
    onEscKeyDown() {
        // when esc pressed, emit tooltip index if status is open
        if (this.isOpen) {
            this.onEscPressed.emit(this.id);
        }
    }

    @HostListener('document:click', ['$event.target'])
    onClick(target) {
        // only emit tooltip index if click element is not button and click point is outside tooltip
        if (target.type !== 'button' && !this.elementRef.nativeElement.contains(target)) {
            this.onOutsideClick.emit(this.id);
        }
    }

    @HostListener('window:scroll', ['$event'])
    checkScroll() {
        // trigger tooltip position observable to call next
        this.tooltipService.updateTooltipPosition(this.elementRef);
    }
}