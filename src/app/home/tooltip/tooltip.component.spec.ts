import { TestBed, ComponentFixture, async } from '@angular/core/testing';
import { TooltipComponent } from './tooltip.component';
import { TooltipService } from './tooltip.service';

const mockTooltipService = {
    tooltipPositionChangeObservable: {
        subscribe: (cb: Function) => {
            cb();
        }
    },
    updateTooltipPosition() {}
};

describe('TooltipComponent', () => {
    let fixture: ComponentFixture<TooltipComponent>;
    let tooltipService: TooltipService;
    let component: TooltipComponent;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [
                TooltipComponent,
            ],
            providers: [{
                provide: TooltipService,
                useValue: mockTooltipService,
            }],
        });

        fixture = TestBed.createComponent(TooltipComponent);
        tooltipService = TestBed.get(TooltipService);
        component = fixture.componentInstance;

        component['tooltipPositionChangeSubscription'] = {
            unsubscribe: () => {}
        };
    });
    
    it('should update tooltip position', async(() => {        
        component['elementRef'] = {
            'nativeElement': {
                'nextSibling': {
                    'offsetTop': 10,
                    'getBoundingClientRect': () => {
                        return {
                            height: 10,
                            y: 10,
                        };
                    },
                },
                'getBoundingClientRect': () => {
                    return {
                        height: 10,
                        y: 10,
                    };
                },
            }
        };
        
        spyOn(tooltipService, 'updateTooltipPosition').and.callThrough();

        component.checkScroll();
        
        fixture.detectChanges();

        component['tooltipPositionChangeSubscription'] = {
            unsubscribe: () => {}
        };

        expect(tooltipService.updateTooltipPosition).toHaveBeenCalled();
        expect(component.top).toEqual(-90);
    }));

    it('should not emit id when button is clicked', () => {
        component['elementRef'] = {
            nativeElement: {
                contains: () => {}
            }
        };

        const target = {
            type: 'button'
        };

        spyOn(component.onOutsideClick, 'emit').and.callThrough();
        spyOn(component['elementRef'].nativeElement, 'contains').and.returnValue(true);

        component.onClick(target);

        expect(component.onOutsideClick.emit).not.toHaveBeenCalled();
    });

    it('should not emit id when click inside', () => {
        component['elementRef'] = {
            nativeElement: {
                contains: () => {}
            }
        };

        const target = {
            type: 'test'
        };

        spyOn(component.onOutsideClick, 'emit').and.callThrough();
        spyOn(component['elementRef'].nativeElement, 'contains').and.returnValue(true);

        component.onClick(target);

        expect(component.onOutsideClick.emit).not.toHaveBeenCalled();
    });

    it('should emit id when click outside', () => {
        component['elementRef'] = {
            nativeElement: {
                contains: () => {}
            }
        };

        const target = {
            type: 'test'
        };

        spyOn(component.onOutsideClick, 'emit').and.callThrough();
        spyOn(component['elementRef'].nativeElement, 'contains').and.returnValue(false);

        component.onClick(target);

        expect(component.onOutsideClick.emit).toHaveBeenCalled();
    });

    it('should emit id when esc pressed', () => {
        component.isOpen = true;

        spyOn(component.onEscPressed, 'emit').and.callThrough();

        component.onEscKeyDown();
        expect(component.onEscPressed.emit).toHaveBeenCalled();
    });
});