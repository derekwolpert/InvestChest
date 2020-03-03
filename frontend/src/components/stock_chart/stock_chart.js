import React from "react";
import * as d3 from "d3";

class StockChart extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [
                { date: "2020-01-29", close: 330.35 },
                { date: "2020-01-30", close: 330.65 },
                { date: "2020-01-31", close: 324.47 },
                { date: "2020-02-03", close: 318.49 },
                { date: "2020-02-04", close: 330.39 },
                { date: "2020-02-05", close: 325.91 },
                { date: "2020-02-06", close: 336.86 },
                { date: "2020-02-07", close: 327.58 },
                { date: "2020-02-10", close: 325.27 },
                { date: "2020-02-11", close: 334.77 },
                { date: "2020-02-12", close: 340.3 },
                { date: "2020-02-13", close: 337.01 },
                { date: "2020-02-14", close: 339.31 },
                { date: "2020-02-18", close: 327 },
                { date: "2020-02-19", close: 334.1 },
                { date: "2020-02-20", close: 331.8 },
                { date: "2020-02-21", close: 313.6 },
                { date: "2020-02-24", close: 311.07 },
                { date: "2020-02-25", close: 294.56 },
                { date: "2020-02-26", close: 298.72 },
                { date: "2020-02-27", close: 284.61 },
                { date: "2020-02-28", close: 284.01 }
            ].map(({ date, close }) => ({
                date: new Date(date),
                value: close
            })),
            height: 500,
            width: 500,
            margin: { top: 20, right: 30, bottom: 30, left: 40 }
        };
        // this.chart = this.chart.bind(this);
        this._chartContainer = React.createRef();
        this.handleChartSize = this.handleChartSize.bind(this);
    }

    componentDidMount() {
        // window.addEventListener("resize", this.handleChartSize);

        this.handleChartSize();

        // d3.select(this._chartContainer)
        //     .append("svg")
        //     .attr("width", this._chartContainer.getBoundingClientRect().width)
        //     .attr("height", 200)
        //     .style("border", "1px solid black");
    }

    handleChartSize() {
        d3.select("chart-container > svg").remove();
        d3.select(this._chartContainer)
            .append("svg")
            .attr("viewBox", [
                0,
                0,
                this._chartContainer.getBoundingClientRect().width,
                262
            ]);
        }


    // chart() {

    //     const x = d3
    //         .scaleUtc()
    //         .domain(d3.extent(this.state.data, d => d.date))
    //         .range([
    //             this.state.margin.left,
    //             this.state.width - this.state.margin.right
    //         ]);

    //     const y = d3
    //         .scaleLinear()
    //         .domain([
    //             d3.min(this.state.data, d => d.value),
    //             d3.max(this.state.data, d => d.value)
    //         ])
    //         .nice()
    //         .range([
    //             this.state.height - this.state.margin.bottom,
    //             this.state.margin.top
    //         ]);

    //     const xAxis = g =>
    //         g
    //             .attr(
    //                 "transform",
    //                 `translate(0,${this.state.height -
    //                     this.state.margin.bottom})`
    //             )
    //             .call(
    //                 d3
    //                     .axisBottom(x)
    //                     .ticks(this.state.width / 80)
    //                     .tickSizeOuter(0)
    //             );

    //     const yAxis = g =>
    //         g
    //             .attr("transform", `translate(${this.state.margin.left},0)`)
    //             .call(d3.axisLeft(y))
    //             .call(g => g.select(".domain").remove());

    //     const line = d3
    //         .line()
    //         .defined(d => !isNaN(d.value))
    //         .x(d => x(d.date))
    //         .y(d => y(d.value));

    //     const area = d3
    //         .area()
    //         .x(d => x(d.date))
    //         .y0(this.state.height - this.state.margin.bottom)
    //         .y1(d => y(d.value));

    //     const svg = d3.create("svg")
    //         .attr("viewBox", [0, 0, this.state.width, this.state.height])
    //         .style("overflow", "visible");

    //     svg.append("g")
    //         .call(xAxis);

    //     svg.append("g")
    //         .call(yAxis);

    //     svg.append("path")
    //         .datum(this.state.data)
    //         .attr("fill", "none")
    //         .attr("stroke", "steelblue")
    //         .attr("stroke-width", 1.5)
    //         .attr("stroke-linejoin", "round")
    //         .attr("stroke-linecap", "round")
    //         .attr("d", line);

    //     svg.append("path")
    //         .datum(this.state.data)
    //         .attr("fill", "steelblue")
    //         .attr("opacity", 0.5)
    //         .attr("class", "area")
    //         .attr("d", area);

    //     return svg.node();
    // }

    render() {
        return (
            <>
                <div className="chart-container" ref={c => this._chartContainer = c} />
            </>
        );
    }
}


export default StockChart;