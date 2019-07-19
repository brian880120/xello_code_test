import { Component, OnInit } from '@angular/core';
import InitState from './home.constant';

@Component({
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
    state: any;

    ngOnInit() {
        this.state = InitState;
    }

    // output handler on outside click
    onClickOutside(index: number) {
        this.state[index].tooltip.isOpen = false;
    }

    // output handler on esc pressed
    onEscPressed(index: number) {
        this.state[index].tooltip.isOpen = false;
    }

    // event handler on button click
    toggleTooltip(index: number) {
        this.state = this.state.map((item, idx) => {
            return {
                ...item,
                tooltip: {
                    ...item.tooltip,
                    isOpen: index === idx ? !item.tooltip.isOpen : false,
                },
            };
        });
    }
}