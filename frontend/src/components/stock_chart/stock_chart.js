import React from "react";
import { CustomizedXTick, CustomizedTooltip } from "./stock_chart_util";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import * as moment from "moment";

class StockChart extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            color: "",
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
            ].map(({ date, close }) => ({ date: moment(date).format("MMM Do"), close }))
        };
        this.setColor = this.setColor.bind(this);
    }

    componentDidMount() {
        this.setColor();
    }

    componentDidUpdate(prevProps) {

    }

    setColor() {
        if (this.state.data[0].close > this.state.data[this.state.data.length - 1].close) {
            this.setState({ color: "#ab4642" });
        } else if (this.state.data[0].close < this.state.data[this.state.data.length - 1].close) {
            this.setState({ color: "#a1b56c" });
        } else {
            this.setState({ color: "#7cafc2" });
        }
    }

    render() {
        
        return (
            <section
                className="stock-chart-container"
                onMouseOver={() =>
                    this.state.color === "#7cafc2"
                        ? null
                        : this.setState({ color: "#7cafc2" })
                }
                onMouseOut={() =>
                    this.state.color === "#7cafc2" ? this.setColor() : null
                }
            >
                <ResponsiveContainer isAnimationActive={false} height={256}>
                    <AreaChart
                        data={this.state.data}
                        margin={{ top: -1, right: 0, left: -1, bottom: 0 }}
                    >
                        <defs>
                            <linearGradient
                                id="colorGradient"
                                x1="0"
                                y1="0"
                                x2="0"
                                y2="1"
                            >
                                <stop
                                    offset="5%"
                                    stopColor={this.state.color}
                                    stopOpacity={0.8}
                                />
                                <stop
                                    offset="95%"
                                    stopColor={this.state.color}
                                    stopOpacity={0}
                                />
                            </linearGradient>
                        </defs>
                        <CartesianGrid />
                        <XAxis
                            dataKey="date"
                            height={24}
                            tick={<CustomizedXTick />}
                        />
                        <YAxis
                            dataKey="close"
                            domain={[
                                dataMin => dataMin - (dataMin % 10),
                                dataMax => dataMax + (10 - (dataMax % 10))
                            ]}
                            width={38}
                            orientation="right"
                            allowDecimals={false}
                        />
                        <Tooltip
                            isAnimationActive={false}
                            cursor={{ stroke: this.state.color }}
                            content={<CustomizedTooltip external={external} />}
                        />
                        <Area
                            type="monotone"
                            dataKey="close"
                            stroke={this.state.color}
                            fillOpacity={1}
                            fill="url(#colorGradient)"
                            isAnimationActive={false}
                            activeDot={{
                                stroke: "var(--bg1)",
                                strokeWidth: 2,
                                r: 6
                            }}
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </section>
        );

    }
}


export default StockChart;