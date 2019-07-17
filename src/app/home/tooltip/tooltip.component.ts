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
} from '@angular/core';
import { TooltipService } from './tooltip.service';

@Component({
    selector: 'tooltip',
    templateUrl: './tooltip.component.html',
    styleUrls: ['./tooltip.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TooltipComponent implements OnInit, OnDestroy {
    top: number;
    private tooltipPositionChangeSubscription;

    constructor(private elementRef: ElementRef, private tooltipService: TooltipService) {}

    ngOnInit() {
        this.top = 200;
        this.tooltipPositionChangeSubscription = this.tooltipService.tooltipPositionChangeObservable.subscribe(() => {
            const componentPosition = this.elementRef.nativeElement.offsetTop;
            const scrollPosition = window.pageYOffset;
            if (componentPosition - scrollPosition > 100) {
                this.top = 200;
            } else {
                this.top = 336;
            }
        });
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