import { Component, OnInit } from '@angular/core';
import InitState from './home.constant';

@Component({
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
    initState: any;

    ngOnInit() {
        this.initState = InitState;
    }

    onClickOutside(index: number) {
        this.initState[index].tooltip.isOpen = false;
    }

    onEscPressed(index: number) {
        this.initState[index].tooltip.isOpen = false;
    }

    toggleTooltip(index: number) {
        this.initState = this.initState.map((item, idx) => {
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