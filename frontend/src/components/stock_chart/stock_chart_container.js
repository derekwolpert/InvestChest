import React from "react";
import StockChart from "./stock_chart";

class StockChartContainer extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <>
                <section className="chart-selectors">
                    <p className="chart-range">1D</p>
                    <p className="divider" />
                    <p className="chart-range">1W</p>
                    <p className="divider" />
                    <p className="chart-range">1M</p>
                    <p className="divider" />
                    <p className="chart-range">3M</p>
                    <p className="divider" />
                    <p className="chart-range">6M</p>
                    <p className="divider" />
                    <p className="chart-range">1Y</p>
                    <p className="divider" />
                    <p className="chart-range">MAX</p>
                </section>
                <StockChart />
            </>
        );
    }
}

export default StockChartContainer;