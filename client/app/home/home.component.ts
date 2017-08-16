import { Component, OnInit, ElementRef } from '@angular/core';

import { User } from '../_models/index';
import { UserService } from '../_services/index';

@Component({
    moduleId: module.id,
    templateUrl: 'home.component.html'
})

export class HomeComponent implements OnInit {

    elementRef: ElementRef;

    constructor(elementRef: ElementRef) {
        this.elementRef = elementRef;
    }

    ngOnInit(){
//     var chart = d3.select(".chart"),
//         margin = {top: 20, right: 20, bottom: 30, left: 40},
//         width = $('.chart').outerWidth() - margin.left - margin.right,
//         height = $('.chart').outerHeight() - margin.top - margin.bottom;
//
//
//    console.log('chart', chart);
//     chart = chart.append('svg');
//     var x = d3.scaleBand().rangeRound([0, width]).padding(0.1),
//         y = d3.scaleLinear().rangeRound([height, 0]);
//
//     var g = chart.append("g")
//         .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
//
//     var data  =  [
//         {letter: 'A', frequency:.434254},
//         {letter:'B', frequency:.434454},
//         {letter:'C', frequency:.436454},
//         {letter:'D', frequency:.437454},
//         {letter:'E', frequency:.439454},
//         {letter:'F', frequency:.437454},
//         {letter:'G', frequency:.433454},
//         {letter:'H', frequency:.434554},
//         {letter:'I', frequency:.434454},
//         {letter:'J', frequency:.434554},
//         {letter:'K', frequency:.434454},
//         {letter:'L', frequency:.433454},
//        ];
//
//       x.domain(data.map(function(d) { return d.letter; }));
//       y.domain([0, d3.max(data, function(d) { return d.frequency; })]);
//
//       g.append("g")
//           .attr("class", "axis axis--x")
//           .attr("transform", "translate(0," + height + ")")
//           .call(d3.axisBottom(x));
//
//       g.append("g")
//           .attr("class", "axis axis--y")
//           .call(d3.axisLeft(y).ticks(10, "%"))
//         .append("text")
//           .attr("transform", "rotate(-90)")
//           .attr("y", 6)
//           .attr("dy", "0.71em")
//           .attr("text-anchor", "end")
//           .text("Frequency");
//
//       g.selectAll(".bar")
//         .data(data)
//         .enter().append("rect")
//           .attr("class", "bar")
//           .attr("x", function(d) { return x(d.letter); })
//           .attr("y", function(d) { return y(d.frequency); })
//           .attr("width", x.bandwidth())
//           .attr("height", function(d) { return height - y(d.frequency); });
//
   }

}