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
        it('it should call if', () => {
            const testArgument = {
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
            service.tooltipPositionChangeObservable.subscribe(data => {
                expect(data).toEqual(20);
            });
            service.updateTooltipPosition(testArgument);
        });

        it('it should call else', () => {
            const testArgument = {
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
            service.tooltipPositionChangeObservable.subscribe(data => {
                expect(data).toEqual(20);
            });
            service.updateTooltipPosition(testArgument);
        });
    });
});