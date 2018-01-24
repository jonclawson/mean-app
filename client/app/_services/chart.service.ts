import { Injectable, ElementRef } from '@angular/core';
//import { Http, Headers, RequestOptions, Response } from '@angular/http';

//import { User } from '../_models/index';
declare var d3:any;
declare var $:any;
@Injectable()
export class ChartService {
    constructor() { }
    drawChart(elementRef: ElementRef, type: string, args: any){
        var chart = d3.select(elementRef.nativeElement).html('').append('svg');
        var margin =  {top: 20, right: 20, bottom: 30, left: 40};
        var options = {
            yLabel: args && args.yLabel? args.yLabel: '',
            margin: margin,
            width :  $(elementRef.nativeElement).outerWidth() - margin.left - margin.right,
            height : $(elementRef.nativeElement).outerHeight() - margin.top - margin.bottom,
            data: args && args.data? args.data: null,
        };
        switch(type){
            case 'bar':
                this.barChart(chart, options);
                break;
            case 'line':
                this.lineChart(chart, options);
                break;
            case 'pie':
                this.pieChart(chart, options);
                break;
            case 'scatter':
                this.scatterChart(chart, options);
                break;
        }

    }
    barChart(chart:any, options:any){
            var margin = options.margin,
                width = options.width,
                height = options.height;
       var x = d3.scaleBand().rangeRound([0, width]).padding(0.1),
           y = d3.scaleLinear().rangeRound([height, 0]);

       var g = chart.append("g")
           .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        var yLabel = options.yLabel;

        if(options && options.data){
            let data = options.data;

             x.domain(data.map(function(d:any) { return d.label; }));
             y.domain([0, d3.max(data, function(d:any) { return d.value; })]);

             g.append("g")
                 .attr("class", "axis axis--x")
                 .attr("transform", "translate(0," + height + ")")
                 .call(d3.axisBottom(x));

             g.append("g")
                 .attr("class", "axis axis--y")
                 .call(d3.axisLeft(y).ticks())
               .append("text")
                 .attr("transform", "rotate(-90)")
                 .attr("y", 6)
                 .attr("dy", "0.71em")
                 .attr("text-anchor", "end")
                 .text(yLabel);

             g.selectAll(".bar")
               .data(data)
               .enter().append("rect")
                 .attr("class", "bar")
                 .attr("x", function(d:any) { return x(d.label); })
                 .attr("y", function(d:any) { return y(d.value); })
                 .attr("width", x.bandwidth())
                 .attr("height", function(d:any) { return height - y(d.value); })
                 .on("mouseover", function(d:any) {
//                     var pos = d3.mouse(this);
//                     //tooltip.text(d.label + " " + d.value);
//                     //d3.select(this).style('stroke-width', "2.5");
//                     return tooltip.style("visibility", "visible");
                 })
                 .on("mousemove", function() {
//                     var X = d3.event.pageX ;//- chart.offset().left;
//                     var Y = d3.event.pageY ;//- chart.offset().top;
//                     return tooltip.style("top", (Y - 10) + "px").style("left", (X + 10) + "px");
                 })
                 .on("mouseout", function() {
//                   // d3.select(this).style('stroke-width', "1.5");
//                    return tooltip.style("visibility", "hidden");
                 });

//                  let tooltip = g.selectAll(".bar").data(data)
//                     .enter()
//                     .append("div")
//                     .attr("class", "tooltip-box")
//                     .style("position", "absolute")
//                     .style("z-index", "100")
//                     .style("visibility", "hidden")
//                     .style("font-weight", "bold")
//                     .style("background-color", "white")
//                     .style("padding", "5px 10px")
//                     .text(function(d:any) {
//                         return (d.label + " " + d.value)
//                     });
        }

    }
    lineChart(chart:any, options:any){
        var g = chart.append("g").attr("transform", "translate(" + options.margin.left + "," + options.margin.top + ")");

        var parseTime = d3.timeParse("%Y%m%d");

        var x = d3.scaleTime().range([0, options.width]),
            y = d3.scaleLinear().range([options.height, 0]),
            z = d3.scaleOrdinal(d3.schemeCategory10);

        var line = d3.line()
            .curve(d3.curveBasis)
            .x(function(d:any) { return x(d.x_value); })
            .y(function(d:any) { return y(d.y_value); });


//         let data = [
//            {
//                label: 'CA',
//                values: [
//                    {x_value: 20114001, y_value: 14.5},
//                    {x_value: 20112001, y_value: 42.5},
//                    {x_value: 20113001, y_value: 41.5},
//                    {x_value: 20110401, y_value: 24.5}
//                ]
//            },
//            {
//                label: 'NY',
//                values: [
//                    {x_value: 20114001, y_value: 34.5},
//                    {x_value: 20112001, y_value: 43.5},
//                    {x_value: 20113001, y_value: 31.5},
//                    {x_value: 20110401, y_value: 22.5}
//                ]
//            },
//            {
//                label: 'MI',
//                values: [
//                    {x_value: 20114001, y_value: 24.5},
//                    {x_value: 20112001, y_value: 32.5},
//                    {x_value: 20113001, y_value: 31.5},
//                    {x_value: 20110401, y_value: 44.5}
//                ]
//            },
//         ]
        let data = options.data
        options.x_data = []
        data.forEach((d:any) => {
          options.x_data = options.x_data.concat(d.values)
        })

          x.domain(d3.extent(options.x_data, function(d:any) { return d.x_value; }));

          y.domain([
            d3.min(data, function(c:any) { return d3.min(c.values, function(d:any) { return d.y_value; }); }),
            d3.max(data, function(c:any) { return d3.max(c.values, function(d:any) { return d.y_value; }); })
          ]);

          z.domain(data.map(function(c:any) { return c.label; }));

          g.append("g")
              .attr("class", "axis axis--x")
              .attr("transform", "translate(0," + options.height + ")")
              .call(d3.axisBottom(x));

          g.append("g")
              .attr("class", "axis axis--y")
              .call(d3.axisLeft(y))
            .append("text")
              .attr("transform", "rotate(-90)")
              .attr("y", 6)
              .attr("dy", "0.71em")
              .attr("fill", "#000")
              .text("y_value, ºF");

          var city = g.selectAll(".city")
            .data(data)
            .enter().append("g")
              .attr("class", "city");

          city.append("path")
              .attr("class", "line")
              .attr("d", function(d:any) { return line(d.values); })
              .style("stroke", function(d:any) { return z(d.label); });

          city.append("text")
              .datum(function(d:any) { return {id: d.label, value: d.values[d.values.length - 1]}; })
              .attr("transform", function(d:any) { return "translate(" + x(d.value.x_value) + "," + y(d.value.y_value) + ")"; })
              .attr("x", 3)
              .attr("dy", "0.35em")
              .style("font", "10px sans-serif")
              .text(function(d:any) { return d.label; });

    }
    pieChart(chart:any, options:any){
        var radius = Math.min(options.width, options.height) / 2;
        var g = chart.append("g").attr("transform", "translate(" + options.width / 2 + "," + options.height / 2 + ")");

        var color = d3.scaleOrdinal(["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56", "#d0743c", "#ff8c00"]);

        var pie = d3.pie()
        .sort(null)
        .value(function(d:any) { return d.value; });

        var path = d3.arc()
        .outerRadius(radius - 10)
        .innerRadius(0);

        var label = d3.arc()
        .outerRadius(radius - 40)
        .innerRadius(radius - 40);


//        var data = [
//            {label: 1-5 , value: 552704659},
//            {label: 5-25 , value: 452704659},
//            {label: 25-35 , value: 352704659},
//            {label: 35-65 , value: 252704659},
//        ];

        if( options && options.data){ console.log('pieData', options.data);
            var data = options.data;
            var arc = g.selectAll(".arc")
            .data(pie(data))
            .enter().append("g")
              .attr("class", "arc");

            arc.append("path")
              .attr("d", path)
              .attr("fill", function(d:any) { return color(d.data.label); });

            arc.append("text")
              .attr("transform", function(d:any) { return "translate(" + label.centroid(d) + ")"; })
              .attr("dy", "0.35em")
              .text(function(d:any) { return d.data.label; });
        }



    }
    scatterChart(chart:any, options:any){
        var data = [[5,3], [10,17], [15,4], [2,8]];
        var x = d3.scaleLinear()
                  .domain([0, d3.max(data, function(d:any) { return d[0]; })])
                  .range([ 0, options.width ]);

        var y = d3.scaleLinear()
                  .domain([0, d3.max(data, function(d:any) { return d[1]; })])
                  .range([ options.height, 0 ]);

        chart
        .attr('width', options.width + options.margin.right + options.margin.left)
        .attr('height', options.height + options.margin.top + options.margin.bottom)
        .attr('class', 'chart')

        var main = chart.append('g')
        .attr('transform', 'translate(' + options.margin.left + ',' + options.margin.top + ')')
        .attr('width', options.width)
        .attr('height', options.height)
        .attr('class', 'main')




          main.append("g")
              .attr("class", "axis axis--x")
              .attr("transform", "translate(0," + options.height + ")")
              .call(d3.axisBottom(x));

          main.append("g")
              .attr("class", "axis axis--y")
              .call(d3.axisLeft(y))
            .append("text")
              .attr("transform", "rotate(-90)")
              .attr("y", 6)
              .attr("dy", "0.71em")
              .attr("fill", "#000")
              .text("Temperature, ºF");

        var g = main.append("svg:g");

        g.selectAll("scatter-dots")
          .data(data)
          .enter().append("svg:circle")
              .attr("cx", function (d:any,i:any) { return x(d[0]); } )
              .attr("cy", function (d:any) { return y(d[1]); } )
              .attr("r", 8);

    }

}