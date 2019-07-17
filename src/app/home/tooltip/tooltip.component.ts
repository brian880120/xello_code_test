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

@Component({
    selector: 'tooltip',
    templateUrl: './tooltip.component.html',
    styleUrls: ['./tooltip.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TooltipComponent implements OnInit, AfterViewInit, OnDestroy {
    top: number;
    private tooltipPositionChangeSubscription;

    constructor(
        private elementRef: ElementRef,
        private tooltipService: TooltipService
    ) {}

    ngOnInit() {
        this.tooltipPositionChangeSubscription = this.tooltipService.tooltipPositionChangeObservable.subscribe(() => {
            if (this.elementRef.nativeElement.getBoundingClientRect().y < 100) {
                const buttonHeight = this.elementRef.nativeElement.nextSibling.getBoundingClientRect().height;
                const buttonTop = this.elementRef.nativeElement.nextSibling.offsetTop;
                this.top = buttonTop + buttonHeight;
            } else {
                this.top = this.elementRef.nativeElement.nextSibling.offsetTop - 100;
            }
        });
    }

    ngAfterViewInit() {
        const buttonTop = this.elementRef.nativeElement.nextSibling.offsetTop - 100;
        this.top = buttonTop;
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
        if (this.isOpen) {
            this.onEscPressed.emit(this.id);
        }
    }

    @HostListener('document:click', ['$event.target'])
    onClick(target) {
        if (target.type !== 'button' && !this.elementRef.nativeElement.contains(target)) {
            this.onOutsideClick.emit(this.id);
        }
    }

    @HostListener('window:scroll', ['$event'])
    checkScroll() {
        this.tooltipService.updateTooltipPosition();
    }
}