import {
    Input,
    Output,
    Component,
    ElementRef,
    HostListener,
    EventEmitter,
} from '@angular/core';

@Component({
    selector: 'tooltip',
    templateUrl: './tooltip.component.html',
    styleUrls: ['./tooltip.component.scss'],
})
export class TooltipComponent {
    constructor(private elementRef: ElementRef) {}

    @Input()
    id: number;

    @Input()
    isOpen: boolean;

    @Input()
    content: string;

    @Output()
    onOutsideClick = new EventEmitter();

    @HostListener('document:click', ['$event.target'])
    onClick(target) {
        if (target.type !== 'button' && !this.elementRef.nativeElement.contains(target)) {
            this.onOutsideClick.emit(this.id);
        }
    }
}