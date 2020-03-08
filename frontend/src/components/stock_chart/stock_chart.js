import React from "react";
import { CustomizedXTick, CustomizedYTick, CustomizedTooltip } from "./stock_chart_util";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

class StockChart extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            color: ""
        };
        this.setColor = this.setColor.bind(this);
    }

    componentDidMount() {
        this.setColor();
    }

    componentDidUpdate(prevProps) {
        if (this.props.data !== prevProps.data) {
            this.setColor();
        }
    }

    setColor() {
        if (this.props.data.length > 0) {

            let first = 0;
            let last = 0;

            for (let i = 0; i < this.props.data.length; i++) {
                if (this.props.data[i].close !== null) {
                    first = this.props.data[i].close;
                    break;
                }
            }

            for (let i = this.props.data.length - 1; i >= 0; i--) {
                if (this.props.data[i].close !== null) {
                    last = this.props.data[i].close;
                    break;
                }
            }
            if (first > last) {
                this.setState({ color: "#ab4642" });
            } else if (first < last) {
                this.setState({ color: "#a1b56c" });
            } else {
                this.setState({ color: "#7cafc2" });
            }
        }
    }

    render() {
        const loadingSpinner = <div className="center-spinner"><div className="lds-ring"><div></div><div></div><div></div><div></div></div></div>;

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
                <p>{this.props.symbol}</p>
                {this.props.data.length > 0 ?
                    <ResponsiveContainer isAnimationActive={false} height={288}>
                        <AreaChart
                            data={this.props.data}
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
                                dataKey={this.props.range === "1d" ? "minute" : "date"}
                                height={14}
                                tick={<CustomizedXTick range={this.props.range} />}
                                minTickGap={this.props.range === "1d" ? 60 : null}
                                tickMargin={-4}
                                tickLine={false}
                                interval="preserveStart"
                            />
                            <YAxis
                                dataKey="close"
                                domain={[
                                    dataMin => Math.floor(dataMin * .95),
                                    dataMax => Math.ceil(dataMax * 1.05)
                                ]}
                                tick={<CustomizedYTick />}
                                width={30}
                                orientation="right"
                                allowDecimals={false}
                                tickMargin={-4}
                                tickLine={false}
                            />
                            <Tooltip
                                isAnimationActive={false}
                                cursor={{ stroke: this.state.color }}
                                content={
                                    <CustomizedTooltip range={this.props.range} />
                                }
                            />
                            <Area
                                type="monotone"
                                dataKey="close"
                                stroke={this.state.color}
                                fillOpacity={1}
                                fill="url(#colorGradient)"
                                isAnimationActive={false}
                                connectNulls={true}
                                activeDot={{
                                    stroke: "var(--bg1)",
                                    strokeWidth: 2,
                                    r: 6
                                }}
                            />
                        </AreaChart>
                    </ResponsiveContainer> : loadingSpinner
                }
            </section>
        );

    }
}


export default StockChart;