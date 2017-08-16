import { Directive, OnChanges, Input, ElementRef } from '@angular/core';

//import { User } from '../_models/index';
import { ChartService } from '../_services/chart.service';

@Directive({
    selector: 'chart'
})

export class ChartDirective implements OnChanges {

    elementRef: ElementRef;
    @Input() type: string;
    constructor(elementRef: ElementRef, private chartService: ChartService) {
        this.elementRef = elementRef;
    }

    ngOnChanges(){
        this.chartService.drawChart(this.elementRef, this.type);
    }

}