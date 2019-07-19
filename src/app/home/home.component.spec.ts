import { TestBed, ComponentFixture } from '@angular/core/testing';
import { HomeComponent } from './home.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('HomeComponent', () => {
    let fixture: ComponentFixture<HomeComponent>;
    let component: HomeComponent;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [HomeComponent],
            schemas: [NO_ERRORS_SCHEMA],
        });

        fixture = TestBed.createComponent(HomeComponent);
        component = fixture.componentInstance;

        component.state = [{
            tooltip: {
                isOpen: true,
                content: 'test',
            },
            button: {
                name: 'Button A',
                class: 'btn btn-primary',        
            }
        }, {
            tooltip: {
                isOpen: false,
                content: 'test',
            },
            button: {
                name: 'Button B',
                class: 'btn btn-secondary',        
            }
        }];
    });

    it('should close tooltip onClickOutside', () => {
        expect(component.state[0].tooltip.isOpen).toEqual(true);
        component.onClickOutside(0);
        expect(component.state[0].tooltip.isOpen).toEqual(false);
    });

    it('should close tooltip onEscPressed', () => {
        expect(component.state[0].tooltip.isOpen).toEqual(true);
        component.onEscPressed(0);
        expect(component.state[0].tooltip.isOpen).toEqual(false);
    });

    it('should toggle tooltip on button clicked', () => {
        expect(component.state[0].tooltip.isOpen).toEqual(true);
        component.toggleTooltip(1);
        expect(component.state[0].tooltip.isOpen).toEqual(false);
        expect(component.state[1].tooltip.isOpen).toEqual(true);
    });
});