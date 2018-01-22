import { Directive, OnChanges, Input, ElementRef } from '@angular/core';

//import { User } from '../_models/index';
import { ChartService } from '../_services/chart.service';

@Directive({
    selector: 'chart'
})

export class ChartDirective implements OnChanges {

    elementRef: ElementRef;
    @Input() type: string;
    @Input() options: any;
    constructor(elementRef: ElementRef, private chartService: ChartService) {
        this.elementRef = elementRef;
    }

    ngOnChanges(){ console.log('chart directive')
        this.chartService.drawChart(this.elementRef, this.type, this.options);
    }

}