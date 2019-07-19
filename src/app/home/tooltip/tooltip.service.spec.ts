import { TestBed } from '@angular/core/testing';
import { TooltipService } from './tooltip.service';

describe('TooltipService', () => {
    let service;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                TooltipService
            ],
        });
        service = TestBed.get(TooltipService);
    });

    describe('updateTooltipPosition', () => {
        it('it should open tooltip below if top less than default height', () => {
            const testArgument = {
                'nativeElement': {
                    'nextSibling': {
                        'offsetTop': 10,
                        'getBoundingClientRect': () => {
                            return {
                                height: 10,
                            };
                        },
                    },
                    'getBoundingClientRect': () => {
                        return {
                            y: 90,
                        };
                    },
                }
            };
            service.tooltipPositionChangeObservable.subscribe(top => {
                expect(top).toEqual(20);
            });
            service.updateTooltipPosition(testArgument);
        });

        it('it should open tooltip above if top larger than default height', () => {
            const testArgument = {
                'nativeElement': {
                    'nextSibling': {
                        'offsetTop': 200,
                        'getBoundingClientRect': () => {
                            return {
                                height: 10,
                            };
                        },
                    },
                    'getBoundingClientRect': () => {
                        return {
                            y: 110,
                        };
                    },
                }
            };
            service.tooltipPositionChangeObservable.subscribe(top => {
                expect(top).toEqual(100);
            });
            service.updateTooltipPosition(testArgument);
        });
    });
});