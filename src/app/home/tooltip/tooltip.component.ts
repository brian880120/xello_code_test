import {
    Input,
    Output,
    Component,
    ElementRef,
    HostListener,
    EventEmitter,
    ChangeDetectionStrategy,
    OnInit,
    OnChanges,
} from '@angular/core';

@Component({
    selector: 'tooltip',
    templateUrl: './tooltip.component.html',
    styleUrls: ['./tooltip.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TooltipComponent {
    constructor(private elementRef: ElementRef) {}

    top: number;

    ngOnInit() {
        this.top = this.elementRef.nativeElement.offsetTop - 100;
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
      const componentPosition = this.elementRef.nativeElement.offsetTop
      const scrollPosition = window.pageYOffset

      if (scrollPosition >= componentPosition) {
        this.top = 100;
      } else {
        this.top = 300;
      }

    }
}